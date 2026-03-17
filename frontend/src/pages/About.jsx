import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Lightbulb, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-24 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-extrabold mb-4 gradient-text">About CollabHub</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Bridging the gap between students across colleges to build impactful projects together.
          </p>
        </motion.div>

        {/* Mission Section */}
        <section className="glass p-10 rounded-2xl mb-16 text-center">
          <h2 className="text-3xl font-bold mb-6 flex items-center justify-center gap-2">
            <Target className="text-primary" /> Our Mission
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            At CollabHub, we believe that innovation happens when diverse minds collaborate. 
            Our mission is to provide a platform where students from different backgrounds and colleges 
            can come together, share ideas, and build real-world projects that solve actual problems.
          </p>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10">How Students Collaborate</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Lightbulb, title: "Post Idea", desc: "Students post their project ideas with required skills." },
              { icon: Users, title: "Form Team", desc: "Others apply to join based on their expertise." },
              { icon: Heart, title: "Build & Grow", desc: "Teams collaborate remotely and build the product." }
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="glass p-8 rounded-xl text-center"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="text-primary w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;