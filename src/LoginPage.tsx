"use client"
import { useState, useRef, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence, Variants, Transition } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
}

interface SocialLogin {
  name: string;
  color: string;
  icon: string;
}

const AdvancedAnimatedLogin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [particles, setParticles] = useState<Particle[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Floating particles system
  useEffect(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
        y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`
      });
    }
    setParticles(newParticles);
  }, []);

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = (): void => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = (): void => {
      ctx.fillStyle = 'rgba(10, 10, 30, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Draw connections
        particles.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
            }
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [particles]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    
    if (activeTab === 'signup' && password !== confirmPassword) {
      alert("Passwords don't match!");
      setIsLoading(false);
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsLoading(false);
  };

  // Fixed variants with proper TypeScript types
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { 
      y: 50, 
      opacity: 0 
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10
      }
    }
  };

  const socialLogins: SocialLogin[] = [
    { name: 'Google', color: 'bg-purple-400', icon: '🔍' },
    { name: 'GitHub', color: 'bg-gray-800', icon: '💻' },
    { name: 'Twitter', color: 'bg-blue-400', icon: '🐦' }
  ];

  const tabs: ('login' | 'signup')[] = ['login', 'signup'];

  // Animation transitions
  const springTransition: Transition = {
    type: "spring",
    stiffness: 100,
    damping: 10
  };

  const scaleTransition: Transition = {
    type: "spring",
    stiffness: 200,
    damping: 10
  };

  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 border-2 border-cyan-400/30 rounded-lg"
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-16 h-16 border-2 border-pink-400/30 rounded-full"
          animate={{
            y: [0, -30, 0],
            rotate: 180,
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-32 left-32 w-24 h-24 border-2 border-yellow-400/30 triangle"
          animate={{
            rotate: 360,
            x: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Main Login Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={springTransition}
        className="relative z-10 min-h-screen flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={springTransition}
          className="bg-transparent opacity-80 backdrop-blur-xs rounded-3xl border border-white/10 shadow-2xl p-8 w-full max-w-md"
        >
          {/* Tab Navigation */}
          <motion.div className="flex mb-8 bg-white/5 rounded-2xl p-1">
            {tabs.map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-linear-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                    : 'text-white/60 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={scaleTransition}
              >
                {tab === 'login' ? 'Sign In' : 'Sign Up'}
              </motion.button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {/* Header */}
              <motion.div variants={itemVariants} className="text-center">
                <motion.h1
                  className="text-4xl font-bold bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2"
                  animate={{
                    backgroundPosition: ['0%', '100%', '0%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                  style={{
                    backgroundSize: '200% 200%',
                  }}
                >
                  {activeTab === 'login' ? 'Welcome Back' : 'Join Us'}
                </motion.h1>
                <p className="text-white/60">
                  {activeTab === 'login' 
                    ? 'Sign in to your account' 
                    : 'Create your account'
                  }
                </p>
              </motion.div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div variants={itemVariants}>
                  <label className="block text-white text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <motion.div 
                    whileHover={{ scale: 1.02 }} 
                    whileFocus={{ scale: 1.02 }}
                    transition={scaleTransition}
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300"
                      placeholder="Enter your email"
                      required
                    />
                  </motion.div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-white text-sm font-medium mb-2">
                    Password
                  </label>
                  <motion.div 
                    whileHover={{ scale: 1.02 }} 
                    whileFocus={{ scale: 1.02 }}
                    transition={scaleTransition}
                  >
                    <input
                      type="password"
                      value={password}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300"
                      placeholder="Enter your password"
                      required
                    />
                  </motion.div>
                </motion.div>

                {activeTab === 'signup' && (
                  <motion.div
                    variants={itemVariants}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={springTransition}
                  >
                    <label className="block text-white text-sm font-medium mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300"
                      placeholder="Confirm your password"
                      required
                    />
                  </motion.div>
                )}

                {/* Remember Me - Only for login */}
                {activeTab === 'login' && (
                  <motion.div
                    variants={itemVariants}
                    className="flex items-center justify-between"
                  >
                    <label className="flex items-center text-white/80 text-sm">
                      <input 
                        type="checkbox" 
                        className="rounded bg-white/20 border-white/30 text-cyan-400 focus:ring-cyan-400" 
                      />
                      <span className="ml-2">Remember me</span>
                    </label>
                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.05, color: "#ffffff" }}
                      className="text-white/80 hover:text-white text-sm transition-colors duration-300"
                      transition={scaleTransition}
                    >
                      Forgot password?
                    </motion.a>
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  variants={itemVariants}
                  type="submit"
                  disabled={isLoading}
                  className="w-full relative overflow-hidden bg-linear-to-r from-cyan-500 to-purple-500 py-4 px-6 rounded-xl font-bold text-white text-lg hover:shadow-2xl transition-all duration-300 disabled:opacity-50"
                  whileHover={{ scale: isLoading ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={scaleTransition}
                >
                  <motion.div
                    animate={{
                      backgroundPosition: ['0%', '100%', '0%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="absolute inset-0 bg-linear-to-r from-cyan-500 via-purple-500 to-cyan-500"
                    style={{ backgroundSize: '200% 200%' }}
                  />
                  
                  <span className="relative z-10 flex items-center justify-center">
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ 
                          duration: 1, 
                          repeat: Infinity, 
                          ease: "linear" 
                        }}
                        className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      activeTab === 'login' ? 'Sign In' : 'Create Account'
                    )}
                  </span>

                  {/* Button shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    animate={{ x: ['-100%', '200%', '-100%'] }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      delay: 1 
                    }}
                  />
                </motion.button>
              </form>

              {/* Social Login */}
              <motion.div variants={itemVariants} className="text-center">
                <div className="relative mb-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-black/20 px-4 text-white/60 text-sm">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {socialLogins.map((social: SocialLogin, index: number) => (
                    <motion.button
                      key={social.name}
                      type="button"
                      className={`${social.color} text-white p-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 relative overflow-hidden`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.5 + index * 0.1,
                        type: "spring",
                        stiffness: 100
                      }}
                    >
                      {social.icon}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Switch Tab Prompt */}
              <motion.div variants={itemVariants} className="text-center">
                <p className="text-white/60">
                  {activeTab === 'login' ? "Don't have an account? " : "Already have an account? "}
                  <motion.button
                    type="button"
                    onClick={() => setActiveTab(activeTab === 'login' ? 'signup' : 'login')}
                    className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    transition={scaleTransition}
                  >
                    {activeTab === 'login' ? 'Sign Up' : 'Sign In'}
                  </motion.button>
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <style jsx>{`
        .triangle {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
      `}</style>
    </div>
  );
};

export default AdvancedAnimatedLogin;
