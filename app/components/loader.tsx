interface LoaderProps {
  progress: number;
}

export const Loader: React.FC<LoaderProps> = ({ progress }) => {
  return (
    <div className="h-[0.3rem] bg-blue-400 fixed top-0 left-0 w-full">
      <div
        className="h-full bg-blue-600 rounded-r transition-all duration-300 ease-in-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
