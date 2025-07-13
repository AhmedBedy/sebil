import { useEffect, useState } from 'react';
import { useMemo } from 'react';

import { supabase } from './supabaseClient';

import logo from './assets/logo.png';

type TranslationKeys =
  | 'home'
  | 'courses'
  | 'adminLogin'
  | 'studentLogin'
  | 'adminDashboard'
  | 'addCourse'
  | 'addStudent'
  | 'learningSlogan'
  | 'appTitle'
  | 'login'
  | 'ourCourses'
  | 'searchCourses'
  | 'prerequisiteFor'
  | 'completePrerequisites'
  | 'welcome'
  | 'footerText'
  | 'edit'
  | 'delete'
  | 'startAssessment'
  | 'submitAssessment'
  | 'backToPreviousCourse'
  | 'learnAtYourPace'
  | 'students'
  | 'phone'
  | 'password'
  | 'resources'
  | 'assessment'
  | 'logout'
  | 'cancel'
  | 'save'
  | 'proceedToCourse'
  | 'allPrerequisitesCompleted'
  | 'editCourse'
  | 'editStudent'
  | 'required'
  | 'completed';

type Resource = {
  type: string;
  title: string;
  url: string;
};

type AssessmentQuestion = {
  question: string;
  options: string[];
  answer: string;
};

type Course = {
  id: number;
  title: string;
  description: string;
  duration: string;
  prerequisites: number[] | null;
  video_url: string | null;
  resources: Resource[] | null;
  assessment_questions: AssessmentQuestion[] | null;
};

export default function App() {
  const translations: Record<
    'ar' | 'fr' | 'en',
    Record<TranslationKeys, string>
  > = {
    en: {
      home: 'Home',
      courses: 'Courses',
      adminLogin: 'Admin Login',
      studentLogin: 'Student Login',
      adminDashboard: 'Admin Dashboard',
      addCourse: 'Add New Course',
      addStudent: 'Add New Student',
      learningSlogan: 'Your Path to Success  ',
      appTitle: 'Maison de Révision',
      login: 'Login',
      ourCourses: 'Our Courses',
      searchCourses: 'Search courses...',
      prerequisiteFor: 'Prerequisite Courses for ',
      completePrerequisites:
        'Please complete all prerequisite courses before continuing.',
      welcome: 'Welcome to Maison de Révision!',
      footerText: '2024 Maison de Révision. All rights reserved.',
      edit: 'Edit',
      delete: 'Delete',
      startAssessment: 'Start Assessment',
      submitAssessment: 'Submit Assessment',
      backToPreviousCourse: 'Back to Previous Course',
      learnAtYourPace: 'Learn at your own pace',
      students: 'Students',
      phone: 'Phone',
      password: 'Password',
      resources: 'Resources',
      assessment: 'Assessment',
      logout: 'Logout',
      cancel: 'Cancel',
      save: 'Save',
      proceedToCourse: 'Proceed to course',
      allPrerequisitesCompleted:
        'All prerequisites completed!   You can proceed to the course.',
      editCourse: 'Edit course',
      editStudent: 'Edit student',
      required: 'Required',
      completed: 'Completed',
    },
    fr: {
      home: 'Accueil',
      courses: 'Cours',
      adminLogin: 'Connexion Admin',
      studentLogin: 'Connexion Élève',
      adminDashboard: 'Tableau de Bord Admin',
      addCourse: 'Ajouter un Nouveau Cours',
      addStudent: 'Ajouter un Nouvel Élève',
      learningSlogan: 'Votre chemin du succès  ',
      appTitle: 'Maison de Révision',
      login: 'Se Connecter',
      ourCourses: 'Nos Cours',
      searchCourses: 'Rechercher des cours...',
      prerequisiteFor: 'Cours préalables pour ',
      completePrerequisites:
        'Veuillez compléter tous les cours préalables avant de continuer.',
      welcome: 'Bienvenue à la Maison de Révision !',
      footerText: '2025 Maison de Révision. Tous droits réservés.',
      edit: 'Modifier',
      delete: 'Supprimer',
      startAssessment: "Commencer l'évaluation",
      submitAssessment: "Soumettre l'évaluation",
      backToPreviousCourse: 'Retour au cours précédent',

      learnAtYourPace: 'Apprenez à votre rythme',
      students: 'Étudiants',
      phone: 'Téléphone',
      password: 'Mot de passe',
      resources: 'Ressources',
      assessment: 'Évaluation',
      logout: 'Déconnexion',
      cancel: 'Annuler',
      save: 'Enregistrer',
      proceedToCourse: 'Accéder au cours',
      allPrerequisitesCompleted:
        'Tous les prérequis sont remplis!    Vous pouvez accéder au cours.',
      editCourse: 'Modifier le cours',
      editStudent: "Modifier l'étudiant",
      required: 'Requis',
      completed: 'Rempli',
    },
    ar: {
      home: 'الرئيسية',
      courses: 'الدروس',
      adminLogin: ' دخول المشرف',
      studentLogin: ' دخول الطالب',
      adminDashboard: 'لوحة تحكم المشرف',
      addCourse: 'إضافة درس جديد',
      addStudent: 'إضافة طالب جديد',
      learningSlogan: 'سبيــــــلك للنجــاح ',
      appTitle: 'بيت المـــــراجعة',
      login: ' الدخول',
      ourCourses: 'دروسنا',
      searchCourses: 'ابحث عن الدروس...',
      prerequisiteFor: 'الدروس اللازمة لمتابعة درس  ',
      completePrerequisites: 'يرجى إكمال جميع الدروس اللازمة قبل المتابعة.',
      welcome: 'مرحبًا بك في بيت المراجعة!',
      footerText: ' 2025 بيت المراجعة. جميع الحقوق محفوظة.',
      edit: 'تعديل',
      delete: 'حذف',
      startAssessment: 'ابدأ الاختبار',
      submitAssessment: 'إرسال الاختبار',
      backToPreviousCourse: 'العودة إلى الدرس السابق',
      learnAtYourPace: 'تعلم اعل راحتك',
      students: 'الطلاب',
      phone: 'الهاتف',
      password: 'كلمة المرور',
      resources: 'المراجع',
      assessment: 'الاختبار',

      logout: 'تسجيل الخروج',

      cancel: 'إلغاء',
      save: 'حفظ',
      proceedToCourse: 'الانتقال إلى الدورة',
      allPrerequisitesCompleted:
        ' جميع الدروس اللازمة أكملت!    يمكنك الانتقال إلى الدرس.',
      editCourse: 'تعديل الدرس',
      editStudent: 'تعديل الطالب',
      required: 'لازم',
      completed: 'تم',
    },
  };

  const t = (key: TranslationKeys) => translations[language][key];

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [navigationHistory, setNavigationHistory] = useState<Course[]>([]);

  const [showAssessment, setShowAssessment] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [quizResult, setQuizResult] = useState<string | null>(null);

  const [courses, setCourses] = useState<Course[]>([]);

  const [currentView, setCurrentView] = useState<
    | 'home'
    | 'admin-login'
    | 'admin-dashboard'
    | 'student-login'
    | 'courses'
    | 'course-detail'
    | 'course-prereqs'
  >('home');
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);

  const [adminCourses, setAdminCourses] = useState<Course[]>([]);
  const [adminStudents, setAdminStudents] = useState<any[]>([]);

  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [editingStudent, setEditingStudent] = useState<any | null>(null);
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [showStudentForm, setShowStudentForm] = useState(false);

  const [studentProgress, setStudentProgress] = useState<
    { course_id: number; completed: boolean }[]
  >([]);

  const [studentAuthenticated, setStudentAuthenticated] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<any>(null);

  const [prereqTargetCourse, setPrereqTargetCourse] = useState<Course | null>(
    null
  );
  const [showPrereqCheck, setShowPrereqCheck] = useState(false);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [language, setLanguage] = useState<'ar' | 'fr' | 'en'>('ar');

  const [mainPrereqCourse, setMainPrereqCourse] = useState<Course | null>(null);

  const [adminCourseSearch, setAdminCourseSearch] = useState('');
  const [adminStudentSearch, setAdminStudentSearch] = useState('');

  const [courseToDelete, setCourseToDelete] = useState<number | null>(null);
  const [studentToDelete, setStudentToDelete] = useState<number | null>(null);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'ar' ? 'fr' : prev === 'fr' ? 'en' : 'ar'));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 7000); // Toast visible for 7 seconds
  };

  const passedCourses = useMemo(() => {
    return new Set(
      studentProgress.filter((p) => p.completed).map((p) => p.course_id)
    );
  }, [studentProgress]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('id', { ascending: true });
    if (error) console.error('Error loading courses:', error);
    else setCourses(data as Course[]);
  };

  const loadAdminData = async () => {
    const { data: coursesData, error: coursesError } = await supabase
      .from('courses')
      .select('*')
      .order('id', { ascending: true });
    const { data: studentsData, error: studentsError } = await supabase
      .from('students')
      .select('*')
      .order('id', { ascending: true });

    if (coursesError) console.error('Error loading courses:', coursesError);
    else setAdminCourses(coursesData as Course[]);

    if (studentsError) console.error('Error loading students:', studentsError);
    else setAdminStudents(studentsData);
  };

  const loadStudentProgress = async (studentId: number) => {
    const { data, error } = await supabase
      .from('progress')
      .select('course_id, completed')
      .eq('student_id', studentId);

    if (error) {
      console.error('Error loading progress:', error);
    } else {
      setStudentProgress(data || []);
    }
  };

  const handleAddCourse = () => {
    setEditingCourse(null);
    setShowCourseForm(true);
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setShowCourseForm(true);
  };

  const handleDeleteCourse = (id: number) => {
    setCourseToDelete(id); // Show the confirmation modal
  };
  const confirmDeleteCourse = async () => {
    if (courseToDelete !== null) {
      await supabase.from('courses').delete().eq('id', courseToDelete);
      await loadAdminData();
      setCourseToDelete(null); // Close the popup
    }
  };

  const handleAddStudent = () => {
    setEditingStudent(null);
    setShowStudentForm(true);
  };

  const handleEditStudent = (student: any) => {
    setEditingStudent(student);
    setShowStudentForm(true);
  };

  const handleDeleteStudent = (id: number) => {
    setStudentToDelete(id); // Triggers the confirmation modal
  };

  const confirmDeleteStudent = async () => {
    if (studentToDelete !== null) {
      await supabase.from('students').delete().eq('id', studentToDelete);
      await loadAdminData();
      setStudentToDelete(null); // Close the modal
    }
  };

  const getCourseById = (id: number): Course | undefined => {
    return courses.find((course) => course.id === id);
  };

  const getStudentStatusForCourse = (course: Course) => {
    if (!course.prerequisites || course.prerequisites.length === 0) {
      return [];
    }

    return course.prerequisites.map((prereqId) => {
      const prereqCourse = getCourseById(prereqId);
      const progress = studentProgress.find((p) => p.course_id === prereqId);
      const completed = progress ? progress.completed : false;

      return {
        course: prereqCourse,
        completed,
      };
    });
  };

  const handleStudentLogout = () => {
    setStudentAuthenticated(false);
    setCurrentStudent(null);
    setCurrentView('student-login'); // redirect to student login view
    setStudentProgress([]); // clear progress (optional)
    showToast(t('logout') || 'Logged out'); // optional feedback
  };

  return (
    <div
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      style={{
        direction: language === 'ar' ? 'rtl' : 'ltr',
        textAlign: language === 'ar' ? 'right' : 'left',
      }}
    >
      <header className="header-content">
        {/* LEFT: logo + language button */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1,
            minWidth: '130px',
          }}
        >
          <img
            src={logo}
            alt="MR Logo"
            style={{ height: '100px', marginBottom: '8px' }}
          />

          <button
            onClick={toggleLanguage}
            style={{
              backgroundColor: '#f6a623',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '8px 12px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '18px',
            }}
          >
            {language === 'en' ? (
              '🇬🇧 English'
            ) : language === 'fr' ? (
              '🇫🇷 Français'
            ) : (
              <span>
                <span
                  style={{
                    fontSize: '0.8em',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                  }}
                >
                  MR
                </span>{' '}
                عربي
              </span>
            )}
          </button>
        </div>

        {/* RIGHT: title, slogan, nav */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 3,
            minWidth: '200px',
            alignItems: 'center',
          }}
        >
          <h1
            style={{
              margin: 0,
              color: 'RGB(128, 255, 128)',
              fontSize: language === 'ar' ? '48px' : '30px',
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              fontFamily: 'Georgia, "Times New Roman", Times, serif',
            }}
          >
            {t('appTitle')}
          </h1>
          <p
            dir={language === 'ar' ? 'rtl' : 'ltr'}
            style={{
              color: 'yellow',
              margin: 0,
              fontSize: language === 'ar' ? '30px' : '20px',
              fontFamily: "'Comic Sans MS', cursive, sans-serif",
              opacity: 0.85,
              fontWeight: '600',
              textAlign: 'center',

              direction: language === 'ar' ? 'rtl' : 'ltr',
            }}
          >
            {t('learningSlogan')}
          </p>

          {/* Nav with expanding gap */}
          {!studentAuthenticated && (
            <nav
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                maxWidth: '300px',
                marginTop: '10px',
              }}
            >
              <button
                onClick={() => setCurrentView('home')}
                style={{
                  background: 'transparent',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '24px',
                  whiteSpace: 'nowrap',
                }}
              >
                {t('home')}
              </button>
              <button
                onClick={() => {
                  setMainPrereqCourse(null);
                  setCurrentView('courses');
                }}
                style={{
                  background: 'transparent',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '24px',
                  whiteSpace: 'nowrap',
                }}
              >
                {t('courses')}
              </button>
            </nav>
          )}

          {studentAuthenticated && currentStudent && (
            <div
              style={{
                marginTop: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: 'white',
                fontSize: '18px',
                fontWeight: 'bold',
              }}
            >
              👤 {currentStudent.name}
              <button
                onClick={handleStudentLogout}
                style={{
                  backgroundColor: '#c0392b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '6px 12px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      <div style={{ padding: '20px' }}>
        {currentView === 'home' && (
          <div>
            <h2>{t('welcome')}</h2>
            <p>{t('learnAtYourPace')}</p>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                maxWidth: '600px', // optional max width
                margin: '0 auto', // center container horizontally
                padding: '20px',
              }}
            >
              {/* Student Login */}
              <div style={{ flex: '1', marginRight: '10px' }}>
                <button
                  onClick={() => setCurrentView('student-login')}
                  style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  {t('studentLogin')}
                </button>
              </div>

              {/* Admin Login */}
              <div
                style={{ flex: '1', marginLeft: '10px', textAlign: 'right' }}
              >
                <button
                  onClick={() => setCurrentView('admin-login')}
                  style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  {t('adminLogin')}
                </button>
              </div>
            </div>
          </div>
        )}

        {currentView === 'courses' && (
          <div>
            <h2>{t('ourCourses')}</h2>
            <input
              type="text"
              placeholder={t('searchCourses')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                maxWidth: '400px',
                padding: '8px',
                margin: '16px 0',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            />

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',
                justifyContent: 'center',
                direction: 'ltr',
                textAlign: 'left',
              }}
            >
              {courses
                .filter(
                  (course) =>
                    course.title
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    course.description
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                )
                .map((course) => (
                  <div
                    key={course.id}
                    onClick={() => {
                      setSelectedCourse(course);

                      if (
                        course.prerequisites &&
                        course.prerequisites.length > 0
                      ) {
                        setMainPrereqCourse(course); // 🆕 Track root course
                        setPrereqTargetCourse(course);
                        setCurrentView('course-prereqs');
                      } else {
                        setMainPrereqCourse(null); // 🧼 Reset if no prerequisites
                        setCurrentView('course-detail');
                      }
                    }}
                    style={{
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      width: '100%',
                      maxWidth: '300px',
                      padding: '16px',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <h3>{course.title}</h3>
                    <p>{course.description}</p>

                    <div
                      style={{
                        width: '100%',
                        height: '150px',
                        backgroundColor: '#eee',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#888',
                        fontSize: '14px',
                      }}
                    >
                      No image
                    </div>

                    <p>
                      <strong>Duration:</strong> {course.duration}
                    </p>
                    {course.prerequisites &&
                      course.prerequisites.length > 0 && (
                        <p>
                          <strong>Prerequisites:</strong>{' '}
                          {course.prerequisites.length} course(s)
                        </p>
                      )}
                  </div>
                ))}
            </div>
          </div>
        )}

        {currentView === 'course-detail' && selectedCourse && (
          <div
            style={{
              padding: '20px',
              maxWidth: '800px',
              margin: '0 auto',
              direction: 'ltr',
              textAlign: 'left',
            }}
          >
            <button
              onClick={() => {
                setMainPrereqCourse(null);
                setCurrentView('courses');
              }}
              style={{
                marginBottom: '20px',
                padding: '8px 16px',
                border: 'none',
                backgroundColor: '#007bff',
                color: 'white',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              ← {t('courses')}
            </button>
            {navigationHistory.length > 0 && (
              <button
                onClick={() => {
                  const previous =
                    navigationHistory[navigationHistory.length - 1];
                  setNavigationHistory((prev) => prev.slice(0, -1));
                  setSelectedCourse(previous);
                  setCurrentView('course-detail');
                }}
                style={{
                  marginLeft: '10px',
                  padding: '8px 16px',
                  border: 'none',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                ← {t('backToPreviousCourse')}
              </button>
            )}

            <h2>{selectedCourse.title}</h2>

            <p>{selectedCourse.description}</p>

            {selectedCourse.video_url && (
              <div style={{ margin: '20px 0' }}>
                <iframe
                  width="100%"
                  height="315"
                  src={selectedCourse.video_url}
                  title={selectedCourse.title + ' video'}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  style={{ borderRadius: '8px' }}
                />
              </div>
            )}

            {selectedCourse.resources &&
              selectedCourse.resources.length > 0 && (
                <div style={{ marginTop: '20px' }}>
                  <h3
                    style={{
                      direction: 'rtl',
                      textAlign: 'right',
                    }}
                  >
                    {t('resources')}
                  </h3>
                  <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                    {selectedCourse.resources.map((res, idx) => (
                      <li
                        key={idx}
                        style={{
                          marginBottom: '12px',
                          padding: '8px',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                          backgroundColor: '#f9f9f9',
                        }}
                      >
                        <span role="img" aria-label={res.type}>
                          {res.type === 'pdf' && '📄'}
                          {res.type === 'image' && '🖼️'}
                          {res.type === 'video' && '🎥'}
                          {res.type === 'website' && '🌐'}
                          {!['pdf', 'image', 'video', 'website'].includes(
                            res.type
                          ) && '📌'}
                        </span>{' '}
                        <strong>{res.type.toUpperCase()}:</strong>{' '}
                        <a
                          href={res.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            textDecoration: 'underline',
                            color: '#007bff',
                          }}
                        >
                          {res.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {selectedCourse.prerequisites &&
              selectedCourse.prerequisites.length > 0 && (
                <div style={{ marginTop: '20px' }}>
                  <h3 style={{ direction: 'rtl', textAlign: 'right' }}>
                    Prerequisites
                  </h3>
                  <ul>
                    {selectedCourse.prerequisites.map((id) => {
                      const course = getCourseById(id);
                      if (!course)
                        return <li key={id}>Course ID: {id} (Not Found)</li>;

                      return (
                        <li key={id}>
                          <button
                            style={{
                              background: 'none',
                              border: 'none',
                              padding: 0,
                              margin: 0,
                              color: '#007bff',
                              textDecoration: 'underline',
                              cursor: 'pointer',
                              fontSize: '1em',
                              fontFamily: 'inherit',
                            }}
                            onClick={() => {
                              // Add current course to history before navigating
                              setNavigationHistory((prev) => [
                                ...prev,
                                selectedCourse,
                              ]);
                              setSelectedCourse(course);
                              setCurrentView('course-detail');
                              setShowAssessment(false);
                              setUserAnswers([]);
                              setQuizResult(null);
                            }}
                          >
                            {course.title}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

            {selectedCourse.assessment_questions && !showAssessment && (
              <button
                onClick={() => {
                  setShowAssessment(true);
                  setUserAnswers(
                    Array(
                      selectedCourse.assessment_questions?.length ?? 0
                    ).fill('')
                  );
                  setQuizResult(null);
                }}
                style={{
                  padding: '10px 20px',
                  backgroundColor: 'green',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginTop: '20px',
                }}
              >
                {t('startAssessment')}
              </button>
            )}

            {showAssessment && selectedCourse.assessment_questions && (
              <div style={{ marginTop: '20px' }}>
                <h3 style={{ direction: 'rtl', textAlign: 'right' }}>
                  {t('assessment')}
                </h3>
                {selectedCourse.assessment_questions.map((q, idx) => (
                  <div
                    key={idx}
                    style={{
                      marginBottom: '16px',
                      padding: '12px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                    }}
                  >
                    <p>{q.question}</p>
                    {q.options.map((opt) => (
                      <label
                        key={opt}
                        style={{ display: 'block', marginBottom: '4px' }}
                      >
                        <input
                          type="radio"
                          name={`question-${idx}`}
                          value={opt}
                          checked={userAnswers[idx] === opt}
                          onChange={() => {
                            const newAnswers = [...userAnswers];
                            newAnswers[idx] = opt;
                            setUserAnswers(newAnswers);
                          }}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                ))}

                <button
                  onClick={async () => {
                    let correct = 0;
                    selectedCourse.assessment_questions!.forEach((q, idx) => {
                      if (
                        q.answer.trim().toLowerCase() ===
                        (userAnswers[idx]?.trim().toLowerCase() ?? '')
                      )
                        correct++;
                    });

                    if (
                      correct === selectedCourse.assessment_questions!.length
                    ) {
                      setQuizResult('✅ Congratulations! You passed!');

                      // Save progress for student
                      console.log('DEBUG: currentStudent', currentStudent);
                      console.log('DEBUG: selectedCourse', selectedCourse);
                      if (currentStudent && selectedCourse) {
                        const { data, error } = await supabase
                          .from('progress')
                          .upsert(
                            [
                              {
                                student_id: currentStudent.id,
                                course_id: selectedCourse.id,
                                completed: true,
                              },
                            ],
                            { onConflict: 'student_id,course_id' } as any
                          );

                        if (error) {
                          showToast('Error saving progress: ' + error.message);
                        } else {
                          // Update local state
                          setStudentProgress((prev) => {
                            // Remove old progress for this course if exists
                            const filtered = prev.filter(
                              (p) => p.course_id !== selectedCourse.id
                            );
                            return [
                              ...filtered,
                              { course_id: selectedCourse.id, completed: true },
                            ];
                          });

                          // Optionally navigate after pass
                          setShowAssessment(false);
                          setCurrentView('course-detail');
                        }
                      }
                    } else {
                      setQuizResult(
                        '❌ Try again. Some answers were incorrect.'
                      );
                    }
                  }}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  {t('submitAssessment')}
                </button>

                {quizResult && (
                  <p style={{ marginTop: '12px', fontWeight: 'bold' }}>
                    {quizResult}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {currentView === 'course-prereqs' && prereqTargetCourse && (
          <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            {mainPrereqCourse &&
              prereqTargetCourse.id !== mainPrereqCourse.id && (
                <button
                  onClick={() => setPrereqTargetCourse(mainPrereqCourse)}
                  style={{
                    marginBottom: '10px',
                    padding: '8px 16px',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  ← {t('backToPreviousCourse')}
                </button>
              )}

            <h3>{t('prerequisiteFor')}</h3>
            <h2 style={{ direction: 'ltr', textAlign: 'left' }}>
              "{prereqTargetCourse.title}"
            </h2>
            {prereqTargetCourse.prerequisites?.filter((prereqId) => {
              const progress = studentProgress.find(
                (p) => p.course_id === prereqId
              );
              return !progress?.completed;
            }).length === 0 && (
              <p style={{ color: 'green' }}>{t('allPrerequisitesCompleted')}</p>
            )}

            <ul style={{ direction: 'ltr', textAlign: 'left' }}>
              {prereqTargetCourse.prerequisites
                ?.filter((prereqId) => {
                  const progress = studentProgress.find(
                    (p) => p.course_id === prereqId
                  );
                  return !progress?.completed;
                })
                .map((prereqId) => {
                  const prereqCourse = courses.find((c) => c.id === prereqId);
                  if (!prereqCourse)
                    return (
                      <li key={prereqId}>Course ID: {prereqId} (Not found)</li>
                    );

                  // Check progress
                  const progress = studentProgress.find(
                    (p) => p.course_id === prereqId
                  );
                  const isCompleted = progress?.completed ?? false;

                  return (
                    <li key={prereqId} style={{ marginBottom: '10px' }}>
                      <button
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: 0,
                          margin: 0,
                          color: '#007bff',
                          textDecoration: 'underline',
                          cursor: 'pointer',
                          fontSize: '1em',
                          fontFamily: 'inherit',
                        }}
                        onClick={() => {
                          if (isCompleted) {
                            setSelectedCourse(prereqCourse);
                            setCurrentView('course-detail');
                          } else {
                            setPrereqTargetCourse(prereqCourse);
                            setCurrentView('course-prereqs');
                          }
                        }}
                      >
                        {prereqCourse.title}
                      </button>
                      {' — '}
                      <strong style={{ color: isCompleted ? 'green' : 'red' }}>
                        {isCompleted ? t('completed') : t('required')}
                      </strong>
                    </li>
                  );
                })}
            </ul>

            <button
              onClick={() => {
                // If all prerequisites completed, go to course detail
                const allCompleted = prereqTargetCourse.prerequisites?.every(
                  (id) => {
                    const p = studentProgress.find((sp) => sp.course_id === id);
                    return p?.completed;
                  }
                );
                if (allCompleted) {
                  setMainPrereqCourse(null);
                  setSelectedCourse(prereqTargetCourse);
                  setCurrentView('course-detail');
                } else {
                  showToast(t('completePrerequisites'));
                }
              }}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginLeft: '10px',
                marginRight: '10px',
              }}
            >
              {t('proceedToCourse')}
            </button>
            <button
              onClick={() => {
                setMainPrereqCourse(null);
                setCurrentView('courses');
              }}
              style={{
                marginTop: '10px',
                padding: '8px 16px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginLeft: '10px',
                marginRight: '10px',
              }}
            >
              {t('cancel')}
            </button>
          </div>
        )}

        {currentView === 'admin-login' && (
          <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
            <h2>{t('adminLogin')}</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const phone = e.currentTarget.phone.value;
                const password = e.currentTarget.password.value;

                const { data, error } = await supabase
                  .from('admins')
                  .select('*')
                  .eq('phone', phone)
                  .single();

                if (error || !data) {
                  showToast('Admin not found');
                  return;
                }

                // Compare password manually (for now, assuming plain text; later, use hashing securely)
                if (data.password === password) {
                  setAdminAuthenticated(true);
                  setCurrentView('admin-dashboard');
                  await loadAdminData();
                } else {
                  showToast('Incorrect password');
                }
              }}
            >
              <input
                type="text"
                name="phone"
                placeholder={t('phone')}
                required
                style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
              />
              <input
                type="password"
                name="password"
                placeholder={t('password')}
                required
                style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
              />
              <button
                type="submit"
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                }}
              >
                {t('login')}
              </button>
            </form>
          </div>
        )}
        {currentView === 'admin-dashboard' && adminAuthenticated && (
          <div style={{ padding: '20px' }}>
            <h2>{t('adminDashboard')}</h2>

            <button
              onClick={() => setCurrentView('home')}
              style={{
                marginBottom: '20px',
                padding: '8px 16px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              ← {t('home')}
            </button>

            <h3>{t('courses')}</h3>
            <input
              type="text"
              value={adminCourseSearch}
              onChange={(e) => setAdminCourseSearch(e.target.value)}
              placeholder={t('searchCourses')}
              style={{
                marginBottom: '10px',
                padding: '6px 10px',
                fontSize: '16px',
                width: '100%',
                maxWidth: '400px',
              }}
            />

            {!showCourseForm && (
              <ul>
                {adminCourses
                  .filter((course) => {
                    const search = adminCourseSearch.toLowerCase();
                    const titleMatch = course.title
                      ?.toLowerCase()
                      .includes(search);
                    const idMatch = course.id.toString().includes(search);
                    return titleMatch || idMatch;
                  })
                  .map((course) => (
                    <li
                      key={course.id}
                      style={{
                        listStyleType: 'none',
                        textAlign: language === 'ar' ? 'left' : 'right',
                      }}
                    >
                      <strong>{course.title}</strong> ( {course.id} ) {'  '}
                      <button
                        style={{ marginRight: '10px', marginLeft: '10px' }}
                        onClick={() => handleEditCourse(course)}
                      >
                        ✏️ {t('edit')}
                      </button>
                      <button
                        style={{ marginRight: '10px', marginLeft: '10px' }}
                        onClick={() => handleDeleteCourse(course.id)}
                      >
                        🗑️ {t('delete')}
                      </button>
                    </li>
                  ))}
              </ul>
            )}

            <button onClick={() => handleAddCourse()}>
              ➕ {t('addCourse')}
            </button>

            {showCourseForm && (
              <div
                style={{
                  marginTop: '20px',
                  padding: '20px',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  backgroundColor: '#f9f9f9',
                  maxWidth: '600px',
                }}
              >
                <h3>{editingCourse ? t('editCourse') : t('addCourse')}</h3>
                <form
                  style={{
                    direction: 'ltr',
                    textAlign: 'left',
                  }}
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const formData = new FormData(form);

                    const prerequisitesRaw =
                      formData.get('prerequisites')?.toString() || '';
                    const resourcesRaw =
                      formData.get('resources')?.toString() || '';
                    const assessmentRaw =
                      formData.get('assessment_questions')?.toString() || '';

                    let prerequisites: number[] = [];
                    let resources: Resource[] | null = null;
                    let assessment_questions: AssessmentQuestion[] | null =
                      null;

                    try {
                      prerequisites = prerequisitesRaw
                        .split(',')
                        .map((id) => parseInt(id.trim()))
                        .filter((id) => !isNaN(id));
                    } catch {
                      showToast(
                        'Invalid prerequisites format. Use comma-separated numbers.'
                      );
                      return;
                    }

                    try {
                      resources = resourcesRaw
                        ? JSON.parse(resourcesRaw)
                        : null;
                    } catch {
                      showToast('Invalid JSON format for resources.');
                      return;
                    }

                    try {
                      assessment_questions = assessmentRaw
                        ? JSON.parse(assessmentRaw)
                        : null;
                    } catch {
                      showToast(
                        'Invalid JSON format for assessment questions.'
                      );
                      return;
                    }

                    const courseData: Partial<Course> = {
                      title: formData.get('title')?.toString() || '',
                      description:
                        formData.get('description')?.toString() || '',
                      duration: formData.get('duration')?.toString() || '',
                      prerequisites,
                      video_url: formData.get('video_url')?.toString() || null,
                      resources,
                      assessment_questions,
                    };

                    if (editingCourse) {
                      const { error } = await supabase
                        .from('courses')
                        .update(courseData)
                        .eq('id', editingCourse.id);
                      if (error) {
                        showToast('Error updating course: ' + error.message);
                      } else {
                        showToast('Course updated successfully!');
                        setShowCourseForm(false);
                        await loadAdminData();
                        await loadCourses();
                      }
                    } else {
                      const { error } = await supabase
                        .from('courses')
                        .insert(courseData);
                      if (error) {
                        showToast('Error adding course: ' + error.message);
                      } else {
                        showToast('Course added successfully!');
                        setShowCourseForm(false);
                        await loadAdminData();
                        await loadCourses();
                      }
                    }
                  }}
                >
                  <div style={{ marginBottom: '8px' }}>
                    <label>
                      Title:
                      <input
                        name="title"
                        defaultValue={editingCourse?.title || ''}
                        required
                        style={{ width: '100%' }}
                      />
                    </label>
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <label>
                      Description:
                      <textarea
                        name="description"
                        defaultValue={editingCourse?.description || ''}
                        style={{ width: '100%' }}
                      />
                    </label>
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <label>
                      Duration:
                      <input
                        name="duration"
                        defaultValue={editingCourse?.duration || ''}
                        style={{ width: '100%' }}
                      />
                    </label>
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <label>
                      Prerequisites (comma-separated course IDs):
                      <input
                        name="prerequisites"
                        defaultValue={
                          editingCourse?.prerequisites?.join(',') || ''
                        }
                        style={{ width: '100%' }}
                      />
                    </label>
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <label>
                      Video URL:
                      <input
                        name="video_url"
                        defaultValue={editingCourse?.video_url || ''}
                        style={{ width: '100%' }}
                      />
                    </label>
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <label>
                      Resources (JSON array):
                      <textarea
                        name="resources"
                        defaultValue={
                          editingCourse?.resources
                            ? JSON.stringify(editingCourse.resources, null, 2)
                            : ''
                        }
                        style={{ width: '100%', height: '100px' }}
                      />
                    </label>
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <label>
                      Assessment Questions (JSON array):
                      <textarea
                        name="assessment_questions"
                        defaultValue={
                          editingCourse?.assessment_questions
                            ? JSON.stringify(
                                editingCourse.assessment_questions,
                                null,
                                2
                              )
                            : ''
                        }
                        style={{ width: '100%', height: '100px' }}
                      />
                    </label>
                  </div>
                  <button
                    style={{ marginRight: '10px', marginLeft: '10px' }}
                    type="submit"
                  >
                    {t('save')}
                  </button>
                  <button
                    type="button"
                    style={{
                      backgroundColor: '#ccc',
                      marginRight: '10px',
                      marginLeft: '10px',
                    }}
                    onClick={() => setShowCourseForm(false)}
                  >
                    {t('cancel')}
                  </button>
                </form>
              </div>
            )}

            <h3>{t('students')}</h3>

            <input
              type="text"
              value={adminStudentSearch}
              onChange={(e) => setAdminStudentSearch(e.target.value)}
              placeholder={
                language === 'ar' ? 'ابحث عن الطلاب...' : 'Search students...'
              }
              style={{
                marginBottom: '10px',
                padding: '6px 10px',
                fontSize: '16px',
                width: '100%',
                maxWidth: '400px',
              }}
            />
            {!showStudentForm && (
              <ul>
                {adminStudents
                  .filter((student) => {
                    const search = adminStudentSearch.toLowerCase();
                    const nameMatch = student.name
                      ?.toLowerCase()
                      .includes(search);
                    const phoneMatch = student.phone
                      ?.toLowerCase()
                      .includes(search);
                    return nameMatch || phoneMatch;
                  })
                  .map((student) => (
                    <li
                      key={student.id}
                      style={{
                        listStyleType: 'none',
                        textAlign: language === 'ar' ? 'left' : 'right',
                      }}
                    >
                      <strong>{student.name}</strong> ( {student.phone} ) {'  '}
                      <button
                        style={{ marginRight: '10px', marginLeft: '10px' }}
                        onClick={() => handleEditStudent(student)}
                      >
                        ✏️ {t('edit')}
                      </button>
                      <button
                        style={{ marginRight: '10px', marginLeft: '10px' }}
                        onClick={() => handleDeleteStudent(student.id)}
                      >
                        🗑️ {t('delete')}
                      </button>
                    </li>
                  ))}
              </ul>
            )}

            <button onClick={() => handleAddStudent()}>
              ➕ {t('addStudent')}
            </button>

            {showStudentForm && (
              <div
                style={{
                  marginTop: '20px',
                  padding: '20px',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  backgroundColor: '#f9f9f9',
                  maxWidth: '600px',
                }}
              >
                <h3>{editingStudent ? t('editStudent') : t('addStudent')}</h3>
                <form
                  style={{
                    direction: 'ltr',
                    textAlign: 'left',
                  }}
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const formData = new FormData(form);

                    const studentData = {
                      name: formData.get('name')?.toString() || '',
                      class: formData.get('class')?.toString() || '',
                      phone: formData.get('phone')?.toString() || '',
                      password: formData.get('password')?.toString() || '',
                    };

                    if (editingStudent) {
                      // Update
                      const { error } = await supabase
                        .from('students')
                        .update(studentData)
                        .eq('id', editingStudent.id);
                      if (error) {
                        showToast('Error updating student: ' + error.message);
                      } else {
                        showToast('Student updated successfully!');
                        setShowStudentForm(false);
                        await loadAdminData();
                      }
                    } else {
                      // Insert
                      const { error } = await supabase
                        .from('students')
                        .insert(studentData);
                      if (error) {
                        showToast('Error adding student: ' + error.message);
                      } else {
                        showToast('Student added successfully!');
                        setShowStudentForm(false);
                        await loadAdminData();
                      }
                    }
                  }}
                >
                  <div style={{ marginBottom: '8px' }}>
                    <label>
                      Name:{' '}
                      <input
                        name="name"
                        defaultValue={editingStudent?.name || ''}
                        required
                        style={{ width: '100%' }}
                      />
                    </label>
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <label>
                      Class:{' '}
                      <input
                        name="class"
                        defaultValue={editingStudent?.class || ''}
                        style={{ width: '100%' }}
                      />
                    </label>
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <label>
                      Phone:{' '}
                      <input
                        name="phone"
                        defaultValue={editingStudent?.phone || ''}
                        required
                        style={{ width: '100%' }}
                      />
                    </label>
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <label>
                      Password:{' '}
                      <input
                        type="text"
                        name="password"
                        defaultValue={editingStudent?.password || ''}
                        required={!editingStudent}
                        placeholder={
                          editingStudent ? 'Leave blank to keep unchanged' : ''
                        }
                        style={{ width: '100%' }}
                      />
                    </label>
                  </div>
                  <button
                    style={{ marginRight: '10px', marginLeft: '10px' }}
                    type="submit"
                  >
                    {t('save')}
                  </button>
                  <button
                    type="button"
                    style={{
                      marginRight: '10px',
                      marginLeft: '10px',
                      backgroundColor: '#ccc',
                    }}
                    onClick={() => setShowStudentForm(false)}
                  >
                    {t('cancel')}
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {currentView === 'student-login' && (
          <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
            <h2>{t('studentLogin')}</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const phone = e.currentTarget.phone.value;
                const password = e.currentTarget.password.value;

                const { data, error } = await supabase
                  .from('students')
                  .select('*')
                  .eq('phone', phone)
                  .single();

                if (error || !data) {
                  showToast('Student not found');
                  return;
                }

                if (data.password === password) {
                  setStudentAuthenticated(true);
                  setCurrentStudent(data);
                  await loadStudentProgress(data.id);
                  setCurrentView('courses');
                } else {
                  showToast('Incorrect password');
                }
              }}
            >
              <input
                type="text"
                name="phone"
                placeholder={t('phone')}
                required
                style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
              />
              <input
                type="password"
                name="password"
                placeholder={t('password')}
                required
                style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
              />
              <button
                type="submit"
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                }}
              >
                {t('login')}
              </button>
            </form>
          </div>
        )}

        {toastMessage && (
          <div
            style={{
              position: 'fixed',
              bottom: '70px',
              left: '20%',
              transform: 'translateX(-13%)',
              backgroundColor: '#333',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '4px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              zIndex: 1000,
              fontWeight: 'bold',
              userSelect: 'none',
            }}
          >
            {toastMessage}
          </div>
        )}

        {courseToDelete !== null && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 9999,
            }}
          >
            <div
              style={{
                background: 'white',
                padding: '20px',
                borderRadius: '8px',
                textAlign: 'center',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                maxWidth: '300px',
                width: '90%',
              }}
            >
              <p style={{ fontWeight: 'bold' }}>
                Are you sure you want to delete this course?
              </p>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  marginTop: '20px',
                }}
              >
                <button
                  onClick={confirmDeleteCourse}
                  style={{
                    backgroundColor: 'red',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  Yes
                </button>
                <button
                  onClick={() => setCourseToDelete(null)}
                  style={{
                    backgroundColor: 'gray',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        {studentToDelete !== null && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 9999,
            }}
          >
            <div
              style={{
                background: 'white',
                padding: '20px',
                borderRadius: '8px',
                textAlign: 'center',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                maxWidth: '300px',
                width: '90%',
              }}
            >
              <p style={{ fontWeight: 'bold' }}>
                Are you sure you want to delete this student?
              </p>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  marginTop: '20px',
                }}
              >
                <button
                  onClick={confirmDeleteStudent}
                  style={{
                    backgroundColor: 'red',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  Yes
                </button>
                <button
                  onClick={() => setStudentToDelete(null)}
                  style={{
                    backgroundColor: 'gray',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer
        style={{
          marginTop: '40px',
          padding: '20px',
          backgroundColor: '#f8f8f8',
          textAlign: 'center',
          borderTop: '1px solid #ddd',
        }}
      >
        <p style={{ margin: 0 }}>&copy; {t('footerText')}</p>
      </footer>
    </div>
  );
}
