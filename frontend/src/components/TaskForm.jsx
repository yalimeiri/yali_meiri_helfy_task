import { useState, useEffect} from "react";

export default function TaskForm({onCreate, onUpdate, onCancel, editingTask})
{
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Medium');  

    useEffect(() => {
        if(editingTask){ //is we are in edit mode these are the default values
            setTitle(editingTask.title);
            setDescription(editingTask.description);
            setPriority(editingTask.priority);
        }
        else{ // default values for create mode
            setTitle('');
            setDescription('');
            setPriority('Medium');
        }
    },[editingTask]);

    const handleSubmit = (e) => {
        e.preventDefault(); // prevent the webpage from automatic refresh

        if(!title.trim()) return; // if the title is empty, dont submit the form

        if (editingTask) { // edit mode
            onUpdate(editingTask.id, {
              title: title.trim(),
              description: description.trim(),
              priority
            });
          } else { // create mode
            onCreate(title.trim(), description.trim(), priority);
          }
      
        setTitle('');
        setDescription('');
        setPriority('Medium');
    };

    return(
        <form onSubmit={handleSubmit} className="task-form">
            <input 
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}/>

            <textarea 
            placeholder="Task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}/>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="High" style={{ color: 'red' }}> High </option>
                    <option value="Medium" style={{ color: 'orange' }}> Medium </option>
                    <option value="Low" style={{ color: 'green' }}> Low </option>
                </select>
            <div className="form-buttons">
                <button type="submit">
                {editingTask ? 'Update Task' : 'Add Task'}
                </button>
                {editingTask && (
                <button type="button" onClick={onCancel} className="cancel-btn">
                    Cancel
                </button>
                )}
                </div>
                </form>
    );
}