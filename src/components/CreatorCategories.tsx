import { motion } from 'motion/react';
import { CATEGORIES } from '../data';
import { 
  Shirt, 
  Gamepad2, 
  Compass, 
  Utensils, 
  Coins, 
  Laptop, 
  Sparkles, 
  Activity, 
  GraduationCap, 
  Laugh, 
  Music, 
  Camera, 
  Heart 
} from 'lucide-react';

interface CreatorCategoriesProps {
  onOpenOnboarding: () => void;
}

export default function CreatorCategories({ onOpenOnboarding }: CreatorCategoriesProps) {
  
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shirt': return <Shirt className="w-5 h-5 text-[#EC4899]" />;
      case 'Gamepad2': return <Gamepad2 className="w-5 h-5 text-[#3B82F6]" />;
      case 'Compass': return <Compass className="w-5 h-5 text-[#10B981]" />;
      case 'Utensils': return <Utensils className="w-5 h-5 text-[#F59E0B]" />;
      case 'Coins': return <Coins className="w-5 h-5 text-[#059669]" />;
      case 'Laptop': return <Laptop className="w-5 h-5 text-[#6C63FF]" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-[#EC4899]" />;
      case 'Activity': return <Activity className="w-5 h-5 text-[#EF4444]" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-[#8B5CF6]" />;
      case 'Laugh': return <Laugh className="w-5 h-5 text-[#F59E0B]" />;
      case 'Music': return <Music className="w-5 h-5 text-[#06B6D4]" />;
      case 'Camera': return <Camera className="w-5 h-5 text-[#64748B]" />;
      case 'Heart': return <Heart className="w-5 h-5 text-[#F43F5E]" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section id="categories" className="py-24 relative bg-[#07070A] overflow-hidden border-t border-white/5">
      {/* Glow backgrounds */}
      <div className="absolute top-1/2 left-1/4 w-[350px] h-[350px] bg-[#A855F7]/3 blur-[110px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold text-[#8F7BFF] uppercase tracking-wider font-mono">
            Diverse Niche Coverage
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mt-4 mb-4">
            Fourteen Creator Segments
          </h2>
          <p className="text-text-secondary text-base">
            No matter how specialized your niche is, we map your cross-platform audience metrics to let the right brands find you.
          </p>
        </div>

        {/* Dynamic Glowing Grid of Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((category) => (
            <motion.div
              key={category.id}
              whileHover={{ 
                scale: 1.03, 
                boxShadow: '0 10px 25px -5px rgba(108, 99, 255, 0.15)',
                borderColor: 'rgba(255, 255, 255, 0.15)'
              }}
              className="p-5 rounded-2xl bg-[#111318] border border-white/5 text-left relative group overflow-hidden cursor-pointer"
              onClick={onOpenOnboarding}
            >
              {/* Corner accent glow indicator */}
              <div className={`absolute top-0 right-0 w-8 h-8 bg-gradient-to-tr ${category.gradient} opacity-10 group-hover:opacity-20 blur-[8px] rounded-full transition-opacity`} />

              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-white/3 flex items-center justify-center border border-white/5 group-hover:bg-white/8 transition-all">
                  {getIcon(category.iconName)}
                </div>
                <h3 className="font-display font-bold text-sm text-white group-hover:text-white transition-colors">
                  {category.name}
                </h3>
              </div>

              <div className="flex items-center justify-between mt-auto">
                <span className="text-[11px] text-text-secondary">Onboarded:</span>
                <span className="text-[11px] font-mono font-bold text-white bg-white/5 px-2 py-0.5 rounded-lg border border-white/5">
                  {category.count} creators
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic helper box */}
        <div className="mt-12 text-center">
          <p className="text-text-secondary text-xs sm:text-sm">
            Don't see your specific micro-category?{' '}
            <button 
              onClick={onOpenOnboarding}
              className="text-[#6C63FF] hover:underline font-semibold cursor-pointer"
            >
              Onboard anyway & suggest a category
            </button>
          </p>
        </div>

      </div>
    </section>
  );
}
