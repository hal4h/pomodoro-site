import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../Auth/AuthProvider';
import { dataMigrationService } from '../../services/dataMigration';
import { FiCheck, FiStar, FiMusic, FiCheckSquare, FiClock } from 'react-icons/fi';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  border-radius: 1rem;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 8px 32px rgba(0,0,0,0.15);
  text-align: center;
`;

const StepContainer = styled.div`
  margin-bottom: 2rem;
`;

const StepTitle = styled.h2`
  color: #6366f1;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const StepDescription = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
`;

const FeatureCard = styled.div`
  background: #f8f9fa;
  border-radius: 0.5rem;
  padding: 1rem;
  text-align: center;
  
  .icon {
    font-size: 2rem;
    color: #6366f1;
    margin-bottom: 0.5rem;
  }
  
  .title {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .description {
    font-size: 0.9rem;
    color: #666;
  }
`;

const Button = styled.button`
  background: #6366f1;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  margin: 0.5rem;
  
  &:hover {
    background: #8b5cf6;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: #eee;
  border-radius: 2px;
  margin-bottom: 2rem;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: #6366f1;
  transition: width 0.3s ease;
  width: ${props => props.progress}%;
`;

const MigrationStatus = styled.div`
  padding: 1rem;
  border-radius: 0.5rem;
  margin: 1rem 0;
  background: ${props => props.success ? '#d1fae5' : '#fee2e2'};
  color: ${props => props.success ? '#065f46' : '#dc2626'};
`;

const OnboardingModal = ({ onComplete }) => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [migrating, setMigrating] = useState(false);
  const [migrationResults, setMigrationResults] = useState(null);

  const steps = [
    {
      title: "welcome to pomoverse! :D",
      description: "your beautiful, productive study companion that rewards you for the lock in session. time to focus and achieve your goals.",
      content: (
        <FeatureGrid>
          <FeatureCard>
            <div className="icon">⏰</div>
            <div className="title">Pomodoro Timer</div>
            <div className="description">25-minute focused work sessions with breaks</div>
          </FeatureCard>
          <FeatureCard>
            <div className="icon">🎨</div>
            <div className="title">beautiful backgrounds</div>
            <div className="description">unlock aesthetic backgrounds as you earn points</div>
          </FeatureCard>
          <FeatureCard>
            <div className="icon">🎵</div>
            <div className="title">focus music</div>
            <div className="description">add your own Spotify tracks for the perfect study vibe</div>
          </FeatureCard>
          <FeatureCard>
            <div className="icon">📝</div>
            <div className="title">task management</div>
            <div className="description">organize tasks and track your productivity</div>
          </FeatureCard>
        </FeatureGrid>
      )
    },
    {
      title: "earn points & unlock features",
      description: "complete Pomodoro sessions and tasks to earn points. use points to unlock beautiful backgrounds and track your progress.",
      content: (
        <div>
          <FeatureGrid>
            <FeatureCard>
              <FiClock className="icon" />
              <div className="title">complete sessions</div>
              <div className="description">+10 points per Pomodoro session</div>
            </FeatureCard>
            <FeatureCard>
              <FiCheckSquare className="icon" />
              <div className="title">complete tasks</div>
              <div className="description">+5 points per completed task</div>
            </FeatureCard>
            <FeatureCard>
              <FiStar className="icon" />
              <div className="title">unlock backgrounds</div>
              <div className="description">spend points on beautiful study environments</div>
            </FeatureCard>
          </FeatureGrid>
        </div>
      )
    },
    // {
    //   title: "Data Migration",
    //   description: "We found some data from your previous sessions. Would you like to migrate it to your new account?",
    //   content: (
    //     <div>
    //       {dataMigrationService.hasLocalData() ? (
    //         <div>
    //           <p style={{ marginBottom: '1rem' }}>
    //             We found your previous progress including points, tasks, and settings.
    //           </p>
    //           {migrating ? (
    //             <MigrationStatus success={false}>
    //               Migrating your data... Please wait.
    //             </MigrationStatus>
    //           ) : migrationResults ? (
    //             <MigrationStatus success={migrationResults.success}>
    //               {migrationResults.success ? 
    //                 '✅ Data migrated successfully!' : 
    //                 `❌ Migration failed: ${migrationResults.error}`
    //               }
    //             </MigrationStatus>
    //           ) : (
    //             <Button onClick={handleMigration}>
    //               Migrate My Data
    //             </Button>
    //           )}
    //         </div>
    //       ) : (
    //         <p>No previous data found. You're all set to start fresh!</p>
    //       )}
    //     </div>
    //   )
    // },
    {
      title: "welcome to the pomo-verse!! ",
      description: "start your first Pomodoro session and begin your productive journey!",
      content: (
        <div>
          <p style={{ marginBottom: '1.5rem' }}>
            Ready to boost your productivity? Click below to start your first session.
          </p>
          <FeatureGrid>
            <FeatureCard>
              <FiClock className="icon" />
              <div className="title">Start Timer</div>
              <div className="description">Begin your first Pomodoro session</div>
            </FeatureCard>
            <FeatureCard>
              <FiCheckSquare className="icon" />
              <div className="title">Add Tasks</div>
              <div className="description">Organize your work and goals</div>
            </FeatureCard>
          </FeatureGrid>
        </div>
      )
    }
  ];

  const handleMigration = async () => {
    if (!user) return;
    
    setMigrating(true);
    try {
      const results = await dataMigrationService.migrateAllData(user.id);
      setMigrationResults(results);
    } catch (error) {
      setMigrationResults({ success: false, error: error.message });
    } finally {
      setMigrating(false);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <ModalOverlay>
      <ModalContent>
        <ProgressBar>
          <ProgressFill progress={progress} />
        </ProgressBar>
        
        <StepContainer>
          <StepTitle>{steps[currentStep].title}</StepTitle>
          <StepDescription>{steps[currentStep].description}</StepDescription>
          {steps[currentStep].content}
        </StepContainer>

        <div>
          {currentStep < steps.length - 1 ? (
            <>
              <Button onClick={handleNext}>
                {currentStep === steps.length - 2 ? 'Complete Setup' : 'Next'}
              </Button>
              <Button onClick={handleSkip} style={{ background: '#6b7280' }}>
                Skip
              </Button>
            </>
          ) : (
            <Button onClick={handleNext}>
              Get Started!
            </Button>
          )}
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default OnboardingModal; 