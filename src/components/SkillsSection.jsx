import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const skillsData = {
  // No `logo` = a concept rather than a product, so there is no mark to show.
  // `mono: true` = single-colour mark, recoloured to match the theme.
  'SRE & Infra': [
    {
      name: 'AWS',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg',
    },
    {
      name: 'Pulumi',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pulumi/pulumi-original.svg',
    },
    { name: 'IaC' },
    {
      name: 'Jenkins',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg',
    },
    {
      name: 'GitHub Actions',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg',
    },
    {
      name: 'ArgoCD',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/argocd/argocd-original.svg',
    },
    { name: 'CI/CD' },
    {
      name: 'Docker',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    },
    {
      name: 'Kubernetes',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-original.svg',
    },
    {
      name: 'Grafana',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg',
    },
    {
      name: 'Prometheus',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg',
    },
    {
      name: 'Loki',
      logo: 'https://raw.githubusercontent.com/grafana/loki/main/docs/sources/logo.png',
    },
    {
      name: 'Datadog',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/datadog/datadog-original.svg',
    },
    {
      name: 'Kong',
      logo: 'https://cdn.simpleicons.org/kong',
      mono: true,
    },
    {
      name: 'Nginx',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg',
    },
    { name: 'Networking' },
  ],
  Languages: [
    {
      name: 'Python',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    },
    {
      name: 'Go',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg',
    },
    {
      name: 'JavaScript',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    },
    {
      name: 'TypeScript',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    },
    {
      name: 'Java',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    },
    {
      name: 'C++',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
    },
    {
      name: 'C',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
    },
    {
      name: 'HTML',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    },
    {
      name: 'CSS',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    },
  ],
  Frontend: [
    {
      name: 'React',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    },
    {
      name: 'Next.js',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    },
    {
      name: 'Redux',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg',
    },
    {
      name: 'Context API',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    },
    {
      name: 'React Router',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/reactrouter/reactrouter-original.svg',
    },
    { name: 'React Query' }, // devicon has no React Query icon; logo is optional
    {
      name: 'React Hooks',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    },
    {
      name: 'React Hook Form',
      logo: 'https://raw.githubusercontent.com/react-hook-form/react-hook-form/master/docs/logo.png',
    },
  ],
  Styling: [
    {
      name: 'Tailwind CSS',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
    },
    {
      name: 'CSS Modules',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    },
    {
      name: 'Styled Components',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/styledcomponents/styledcomponents-original.svg',
    },
    {
      name: 'Framer Motion',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg',
      mono: true,
    },
  ],
  Backend: [
    {
      name: 'Node.js',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    },
    {
      name: 'Express.js',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
      mono: true,
    },
    {
      name: 'Django',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
    },
    {
      name: 'Pug',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pug/pug-original.svg',
    },
    {
      name: 'Mongoose',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongoose/mongoose-original.svg',
    },
    {
      name: 'REST API',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
    },
  ],
  'ML/Data Science': [
    {
      name: 'TensorFlow',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
    },
    {
      name: 'Keras',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/keras/keras-original.svg',
    },
    {
      name: 'OpenCV',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg',
    },
    {
      name: 'PyTorch',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
    },
    {
      name: 'Scikit-Learn',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg',
    },
    {
      name: 'NumPy',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg',
    },
    {
      name: 'Pandas',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg',
    },
    {
      name: 'Matplotlib',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg',
    },
    {
      name: 'Plotly',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/plotly/plotly-original.svg',
    },
    {
      name: 'SciPy',
      logo: 'https://scipy.org/images/logo.svg',
    },
  ],
  Database: [
    {
      name: 'PostgreSQL',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    },
    {
      name: 'MySQL',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    },
    {
      name: 'MongoDB',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    },
    {
      name: 'SQLite',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg',
    },
    {
      name: 'Supabase',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg',
    },
  ],
  'Tools & IDEs': [
    {
      name: 'Claude Code',
      logo: 'https://cdn.simpleicons.org/claude',
    },
    {
      name: 'Git',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    },
    {
      name: 'GitHub',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
      mono: true,
    },
    {
      name: 'Bitbucket',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bitbucket/bitbucket-original.svg',
    },
    {
      name: 'Visual Studio Code',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
    },
    {
      name: 'IntelliJ IDEA',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg',
    },
    {
      name: 'Postman',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg',
    },
    {
      name: 'Jupyter Notebook',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg',
    },
    {
      name: 'Vite',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg',
    },
    {
      name: 'tmux',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tmux/tmux-original.svg',
    },
  ],
  Concepts: [
    {
      name: 'Data Structures & Algorithms',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
    },
    {
      name: 'System Design',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-original.svg',
    },
    {
      name: 'DBMS',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    },
    {
      name: 'OOPs',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    },
    {
      name: 'Computer Networks',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/debian/debian-original.svg',
    },
    {
      name: 'Operating Systems',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
    },
    {
      name: 'Machine Learning',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
    },
    {
      name: 'Computer Vision',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg',
    },
  ],
};

const Tab = ({ children, setPosition, isActive, onClick }) => {
  const ref = useRef(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      onClick={onClick}
      className={`relative z-10 block cursor-pointer px-2 py-1.5 text-xs font-medium transition-colors duration-200 sm:px-3 sm:py-2 md:px-4 md:py-3 md:text-sm ${
        isActive ? 'text-white' : 'text-foreground hover:text-foreground/80'
      }`}
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
      className="absolute z-0 h-6 rounded-lg bg-primary sm:h-8 sm:rounded-xl md:h-11"
    />
  );
};

const SlideTabs = ({ tabs, activeTab, setActiveTab }) => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  // Set initial position for active tab
  useEffect(() => {
    const activeIndex = tabs.indexOf(activeTab);
    const activeElement = document.querySelector(
      `[data-tab-index="${activeIndex}"]`
    );
    if (activeElement) {
      const { width } = activeElement.getBoundingClientRect();
      setPosition({
        left: activeElement.offsetLeft,
        width,
        opacity: 1,
      });
    }
  }, [activeTab, tabs]);

  return (
    <div className="overflow-x-auto scrollbar-hide">
      <ul
        onMouseLeave={() => {
          // Reset to active tab position
          const activeIndex = tabs.indexOf(activeTab);
          const activeElement = document.querySelector(
            `[data-tab-index="${activeIndex}"]`
          );
          if (activeElement) {
            const { width } = activeElement.getBoundingClientRect();
            setPosition({
              left: activeElement.offsetLeft,
              width,
              opacity: 1,
            });
          }
        }}
        className="relative mx-auto flex w-max min-w-full sm:w-fit rounded-xl sm:rounded-2xl border-2 border-border bg-card p-1 shadow-sm"
      >
        {tabs.map((tab, index) => (
          <div key={tab} data-tab-index={index}>
            <Tab
              setPosition={setPosition}
              isActive={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </Tab>
          </div>
        ))}
        <Cursor position={position} />
      </ul>
    </div>
  );
};

export const SkillsSection = () => {
  const [activeTab, setActiveTab] = useState('SRE & Infra');
  const tabs = Object.keys(skillsData);

  // Animation variants
  const headerVariants = {
    hidden: {
      opacity: 0,
      y: -30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const skillItemVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  const skillContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  return (
    <section
      id="skills"
      className="py-20 sm:py-30 px-4 relative overflow-hidden"
    >
      <div className="container px-4 md:px-6 mx-auto max-w-6xl text-center">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-2 py-2"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Technical Skills
          </motion.h2>
          <motion.p
            className="text-sm sm:text-base text-foreground/80 mb-6 sm:mb-8 max-w-md sm:max-w-none"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            My expertise across various technologies and tools
          </motion.p>
        </motion.div>

        <div className="mt-6 sm:mt-8 md:mt-12">
          {/* Tab Navigation with Slide Effect */}
          <motion.div
            className="flex justify-center mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <SlideTabs
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </motion.div>

          {/* Skills Content */}
          <div className="p-4 sm:p-6 min-h-[180px] sm:min-h-[200px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                className="flex flex-wrap gap-2 sm:gap-3 justify-center"
                variants={skillContainerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {skillsData[activeTab].map((skill) => (
                  <motion.div
                    key={skill.name}
                    className="bg-background border rounded-md font-medium text-xs sm:text-sm py-1.5 px-3 sm:py-2 sm:px-4 hover:bg-accent transition-all duration-300 flex items-center gap-1.5 sm:gap-2 group cursor-pointer"
                    variants={skillItemVariants}
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {skill.logo && (
                      <motion.img
                        alt=""
                        className={`h-4 w-4 sm:h-5 sm:w-5 object-contain${
                          skill.mono ? ' brightness-0 dark:invert' : ''
                        }`}
                        src={skill.logo}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                        whileHover={{
                          scale: 1.2,
                          rotate: 5,
                        }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                    <span className="text-foreground whitespace-nowrap text-xs sm:text-sm">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
