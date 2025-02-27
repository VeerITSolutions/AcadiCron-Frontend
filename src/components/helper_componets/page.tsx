interface NoteProps {
  message: string;
}

const Note: React.FC<NoteProps> = ({ message }) => {
  return (
    <div className="text-gray-800 rounded-md border-l-4 border-orange-500 bg-yellow-100 p-3 shadow-md">
      <strong>Note:</strong> {message}
    </div>
  );
};

export default Note;
