import { FC, FormEvent, useState } from 'react';

interface TodoFormProps {
  onAdd: (title: string) => void;
}

const TodoForm: FC<TodoFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title);
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
