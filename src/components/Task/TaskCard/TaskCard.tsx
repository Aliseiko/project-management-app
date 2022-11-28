import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/reduxTypedHooks';
import { selectTasksList } from 'store/selectors/selectors';
import styles from './TaskCard.module.scss';
import { updateTask } from 'store/taskSlice/taskThunk';
import { GetBoardByIdTaskData, DataFromEditForm, RequestUpdateTask } from 'types/types';
import { selectUser } from 'store/selectors/selectors';
import { findTask } from 'utils/utils';
import Modal from 'components/Modal';
import TaskDelete from '../TaskDelete';
import EditingModal from 'components/Modal/EditingModal';
import { Draggable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';

type Props = {
  taskId: string;
  columnId: string;
  index: number;
};

const TaskCard: React.FC<Props> = (props) => {
  const { taskId, columnId, index } = props;
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation('translation', { keyPrefix: 'board' });

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const tasksList = useAppSelector(selectTasksList);

  const currentTask = findTask(tasksList, columnId, taskId) as GetBoardByIdTaskData;
  const { userId, title, order, description } = currentTask;

  const isOwner = () => userId === user.id;

  const handleClick = (data: DataFromEditForm) => {
    const dataForUpdatetask: RequestUpdateTask = {
      taskId: taskId,
      boardId: tasksList.id,
      columnId: columnId,
      body: {
        title: data.title,
        description: data.description as string,
        userId: userId,
        order: order,
        boardId: tasksList.id,
        columnId: columnId,
      },
    };

    dispatch(updateTask(dataForUpdatetask));
    closeModal();
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Draggable draggableId={taskId} index={index}>
        {(provided, snapshot) => (
          <li
            className={snapshot.isDragging ? styles.drag : styles.item}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div className={styles.header}>
              <h2 className={styles.title}>{title}</h2>
              <div className={styles.actions}>
                <div className={styles.edit} onClick={openModal}></div>
                <TaskDelete taskId={taskId} columnId={columnId} title={title} />
              </div>
            </div>
            <div className={styles.description}>{currentTask?.description}</div>
            {isOwner() && <div className={styles.owner}>{t('my-task')}</div>}
          </li>
        )}
      </Draggable>

      <Modal kind="confirmation" onClose={closeModal} isOpen={isOpen}>
        <EditingModal
          entity="task"
          onConfirm={handleClick}
          onCancel={closeModal}
          operation={'edit'}
          isOpen={false}
          currentValue={{ title: title, description: description }}
        />
      </Modal>
    </>
  );
};
export default TaskCard;
