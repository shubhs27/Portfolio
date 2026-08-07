import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

// Roles carry 'YYYY-MM' dates; every label below is derived, so an ongoing
// role's duration keeps counting without anyone editing this file.
const parseMonth = (value) => {
  const [year, month] = value.split('-').map(Number);
  return { year, month };
};

const thisMonth = () => {
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth() + 1 };
};

const formatMonth = (value) => {
  const { year, month } = parseMonth(value);
  return `${MONTHS[month - 1]} ${year}`;
};

const formatRange = (start, end) =>
  `${formatMonth(start)} - ${end ? formatMonth(end) : 'Present'}`;

// Elapsed months between the two, so Aug 2025 - Jul 2026 is 11 mos. A role that
// spans its whole end month (Transvolt) sets `months` to override this.
const monthsBetween = (start, end) => {
  const from = parseMonth(start);
  const to = end ? parseMonth(end) : thisMonth();
  return (to.year - from.year) * 12 + (to.month - from.month);
};

const spanOf = (role) => role.months ?? monthsBetween(role.start, role.end);

const formatSpan = (months) => {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts = [];
  if (years) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  if (rest) parts.push(`${rest} mo${rest > 1 ? 's' : ''}`);
  return parts.join(' ') || '1 mo';
};

// roles are newest first, so the span runs from the last role's start to the
// first role's end.
const tenureOf = (roles) => {
  const oldest = roles[roles.length - 1];
  const { end } = roles[0];
  const months =
    roles.length === 1 ? spanOf(oldest) : monthsBetween(oldest.start, end);
  return `${formatRange(oldest.start, end)} • ${formatSpan(months)}`;
};

export const ExperienceSection = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      if (typeof document !== 'undefined') {
        setIsDarkMode(document.documentElement.classList.contains('dark'));
      }
    };

    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);

    if (typeof document !== 'undefined') {
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
      });
    }

    return () => observer.disconnect();
  }, []);

  const experiences = [
    {
      company: 'CRED',
      type: 'On-site',
      location: 'Bengaluru, Karnataka',
      roles: [
        { title: 'Site Reliability Engineer', start: '2026-07' },
        {
          title: 'Site Reliability Engineer Intern',
          start: '2025-08',
          end: '2026-07',
        },
      ],
      logo: '/cred.png',
      description: [],
      skills: ['AWS', 'Pulumi', 'CI/CD'],
    },
    {
      company: 'Transvolt Mobility',
      type: 'On-site',
      location: 'Gurugram, Haryana',
      roles: [
        // Ran through the end of July, so the elapsed-month count is short by one.
        { title: 'Data Science Intern', start: '2025-06', end: '2025-07', months: 2 },
      ],
      logo: '/transvolt.png',
      description: [
        'Launched the Bugzilla-based Issue Tracker with a clean, user-friendly UI, role-based access controls, and SMTP email integration—improving reporting efficiency and reducing triage time.',
        'Developed interactive dashboards using Django to visualize and interpret vehicle-sensor data, enabling early detection of battery health degradation patterns.',
        'Deployed applications on AWS EC2 using Docker, Gunicorn, and Nginx, ensuring scalable and production-ready performance.',
      ],
      skills: [
        'Django',
        'PostgreSQL',
        'Python',
        'Tailwind CSS',
        'Docker',
        'AWS',
        'Nginx',
        'Linux',
      ],
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

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

  const timelineVariants = {
    hidden: {
      scaleY: 0,
      originY: 0,
    },
    visible: {
      scaleY: 1,
      transition: {
        duration: 1.2,
        ease: 'easeOut',
        delay: 0.5,
      },
    },
  };

  const experienceItemVariants = {
    hidden: {
      opacity: 0,
      x: -50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const dotVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: 'backOut',
        delay: 0.3,
      },
    },
  };

  const skillVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 10,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  const skillContainerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <section id="experience" className="py-30 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          className="text-center mb-12"
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
            Experience
          </motion.h2>
          <motion.p
            className="text-base text-foreground/80 mb-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            My professional journey
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Animated Timeline line - responsive positioning */}
          <motion.div
            className="absolute left-6 md:left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent"
            variants={timelineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-200px' }}
          />

          <motion.div
            className="space-y-8 md:space-y-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="relative flex flex-col md:flex-row"
                variants={experienceItemVariants}
              >
                {/* Company Logo instead of dot */}
                <motion.div
                  className="absolute left-2 md:left-2 w-8 h-8 bg-background rounded-full border-2 border-gray-800 dark:border-gray-200 shadow-lg mt-0 transition-colors duration-300 z-10 flex items-center justify-center overflow-hidden"
                  variants={dotVariants}
                >
                  <img
                    src={exp.logo}
                    alt={`${exp.company} logo`}
                    className="w-6 h-6 object-contain"
                    style={
                      exp.company === 'CRED'
                        ? {
                            filter: isDarkMode ? 'invert(1)' : 'none',
                            transition: 'filter 0.3s ease',
                          }
                        : {}
                    }
                  />
                </motion.div>

                {/* Content with enhanced animations - responsive layout */}
                <div className="ml-12 md:ml-12 flex-1 flex flex-col md:flex-row">
                  {/* Left side - Company with slide animation - responsive width */}
                  <motion.div
                    className="flex-shrink-0 w-full md:w-72 md:pr-12 mb-4 md:mb-0 text-left"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                  >
                    <h3 className="text-xl md:text-2xl font-semibold text-foreground">
                      {exp.company}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {tenureOf(exp.roles)}
                    </p>
                  </motion.div>

                  {/* Right side - Roles held, then all other details */}
                  <motion.div
                    className="flex-1"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                  >
                    <motion.div
                      className="relative mb-4 text-left"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.2 + 0.5 }}
                    >
                      {/* Rail linking multiple roles held at the same company */}
                      {exp.roles.length > 1 && (
                        <span
                          className="absolute left-[3px] top-3 bottom-3 w-px bg-border"
                          aria-hidden="true"
                        />
                      )}
                      <div className="space-y-3">
                        {exp.roles.map((role) => (
                          <div key={role.title} className="relative pl-5">
                            <span
                              className="absolute left-0 top-2.5 w-[7px] h-[7px] rounded-full bg-primary"
                              aria-hidden="true"
                            />
                            <h4 className="text-lg font-semibold text-primary">
                              {role.title}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {`${formatRange(role.start, role.end)} · ${formatSpan(
                                spanOf(role)
                              )}`}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div
                      className="text-sm text-muted-foreground mb-4 text-left"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.2 + 0.7 }}
                    >
                      {exp.type} • {exp.location}
                    </motion.div>

                    {exp.description.length > 0 && (
                      <motion.div
                        className="text-muted-foreground text-sm mb-3 leading-relaxed text-left max-w-2xl"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.2 + 0.8 }}
                      >
                        {exp.description.map((bullet, bulletIndex) => (
                          <p key={bulletIndex} className="mb-2">
                            • {bullet}
                          </p>
                        ))}
                      </motion.div>
                    )}

                    <motion.div
                      className="flex flex-wrap gap-1.5"
                      variants={skillContainerVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      {exp.skills.map((skill, skillIndex) => (
                        <motion.span
                          key={skillIndex}
                          className="bg-background border rounded-md font-medium text-xs py-1 px-2.5 sm:py-1.5 sm:px-3 hover:bg-accent transition-all duration-300 flex items-center gap-1 sm:gap-1.5 group cursor-pointer"
                          variants={skillVariants}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
