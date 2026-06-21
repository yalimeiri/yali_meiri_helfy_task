import { useState, useEffect, useCallback } from 'react';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, onDelete, onToggle, onEdit }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState('');

  useEffect(() => {
    if (!tasks || tasks.length === 0) return;
    if (currentIndex >= tasks.length) {
      setCurrentIndex(0);
    }
  }, [tasks, tasks?.length, currentIndex]);

  const goToSlide = useCallback((direction) => {
    if (isTransitioning || !tasks) return;

    setIsTransitioning(true);
    setSlideDirection(direction);

    setTimeout(() => {
      if (direction === 'next') {
        setCurrentIndex(prev => (prev + 1) % tasks.length);
      } else {
        setCurrentIndex(prev => (prev - 1 + tasks.length) % tasks.length);
      }
      setSlideDirection('');
      setIsTransitioning(false);
    }, 400);
  }, [isTransitioning, tasks]);

  const goNext = useCallback(() => goToSlide('next'), [goToSlide]);
  const goPrev = useCallback(() => goToSlide('prev'), [goToSlide]);

  if (!tasks || tasks.length === 0) {
    return <p className="empty">No tasks found. Add a new task to get started.</p>;
  }

  let slideClass = 'carousel-slide';
  if (slideDirection === 'next') slideClass += ' slide-out-left';
  if (slideDirection === 'prev') slideClass += ' slide-out-right';
  if (!slideDirection) slideClass += ' slide-in';

  return (
    <div className="carousel-container">
      <button className="carousel-btn prev-btn" onClick={goPrev}>◀</button>

      <div className="carousel-track">
        <div className={slideClass}>
          <TaskItem
            task={tasks[currentIndex]}
            onDelete={onDelete}
            onToggle={onToggle}
            onEdit={onEdit}
          />
        </div>
      </div>

      <button className="carousel-btn next-btn" onClick={goNext}>▶</button>

      <div className="carousel-dots">
        {tasks.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      <p className="carousel-counter">{currentIndex + 1} / {tasks.length}</p>
    </div>
  );
}