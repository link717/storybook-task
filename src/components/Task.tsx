import React from 'react';

type TaskStateType = 'TASK_INBOX' | 'TASK_PINNED' | 'TASK_ARCHIVED';

export interface ITask {
  id: string;
  title: string;
  state: TaskStateType;
}

interface ITaskProps {
  task: ITask;
  onArchiveTask: (id: string) => void;
  onPinTask: (id: string) => void;
}

export default function Task({ task: { id, title, state }, onArchiveTask, onPinTask }: ITaskProps) {
  return (
    <div className={`list-item ${state}`}>
      <label className="checkbox">
        <input type="checkbox" defaultChecked={state === 'TASK_ARCHIVED'} disabled={true} name="checked" />
        <span role="button" className="checkbox-custom" onClick={() => onArchiveTask(id)} id={`archiveTask-${id}`} aria-label={`archiveTask-${id}`} />
      </label>
      <div className="title">
        <input type="text" value={title} readOnly={true} placeholder="Input title" />
      </div>

      <div className="actions" onClick={(event) => event.stopPropagation()}>
        {state !== 'TASK_ARCHIVED' && (
          <a onClick={() => onPinTask(id)}>
            <span role="button" className="icon-star" id={`pinTask-${id}`} aria-label={`pinTask-${id}`} />
          </a>
        )}
      </div>
    </div>
  );
}
