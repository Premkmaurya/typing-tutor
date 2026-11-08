import React from 'react';
import { RotateCcw, Pause, Play, Settings, Keyboard as KeyboardIcon } from 'lucide-react';
import { Button } from '../common/Button';
import { useSettingsStore } from '../../store/settingsStore';

interface PracticeControlsProps {
  status: 'idle' | 'running' | 'paused' | 'completed';
  onPause: () => void;
  onResume: () => void;
  onRestart: () => void;
  onChangeLesson: () => void;
}

export const PracticeControls: React.FC<PracticeControlsProps> = ({
  status,
  onPause,
  onResume,
  onRestart,
  onChangeLesson,
}) => {
  const { virtualKeyboardVisible, toggleVirtualKeyboard } = useSettingsStore();

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 w-full py-0.5">
      <div className="flex items-center gap-2">
        {status === 'running' ? (
          <Button
            variant="outline"
            size="sm"
            onClick={onPause}
            icon={<Pause size={14} />}
          >
            Pause
          </Button>
        ) : status === 'paused' ? (
          <Button
            variant="primary"
            size="sm"
            onClick={onResume}
            icon={<Play size={14} />}
          >
            Resume
          </Button>
        ) : null}

        <Button
          variant="secondary"
          size="sm"
          onClick={onRestart}
          icon={<RotateCcw size={14} />}
        >
          Restart
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant={virtualKeyboardVisible ? 'secondary' : 'outline'}
          size="sm"
          onClick={toggleVirtualKeyboard}
          icon={<KeyboardIcon size={14} />}
          title="Toggle on-screen virtual keyboard"
        >
          {virtualKeyboardVisible ? 'Hide Keyboard' : 'Show Keyboard'}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onChangeLesson}
          icon={<Settings size={14} />}
        >
          Change Lesson
        </Button>
      </div>
    </div>
  );
};
