import { Check } from 'lucide-react';

interface WizardStepsProps {
  currentStep: number;
  steps: {
    number: number;
    title: string;
    description: string;
  }[];
}

export default function WizardSteps({ currentStep, steps }: WizardStepsProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              {/* Step Circle */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                  step.number < currentStep
                    ? 'bg-primary-600 border-primary-600 text-white'
                    : step.number === currentStep
                    ? 'bg-white border-primary-600 text-primary-600'
                    : 'bg-gray-100 border-gray-300 text-gray-400'
                }`}
              >
                {step.number < currentStep ? (
                  <Check size={24} />
                ) : (
                  <span className="font-bold">{step.number}</span>
                )}
              </div>

              {/* Step Info */}
              <div className="mt-2 text-center">
                <div
                  className={`text-sm font-medium ${
                    step.number <= currentStep ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  {step.title}
                </div>
                <div className="text-xs text-gray-500 mt-1">{step.description}</div>
              </div>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={`h-0.5 w-full mx-4 transition-all ${
                  step.number < currentStep ? 'bg-primary-600' : 'bg-gray-300'
                }`}
                style={{ marginBottom: '3rem' }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
