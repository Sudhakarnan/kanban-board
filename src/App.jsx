import { TaskProvider } from "./context/TaskContext";
import Board from "./components/Board";
import TaskModal from "./components/TaskModal";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import SearchBar from "./components/SearchBar";
import ArchivePanel from "./components/ArchivePanel";

function App() {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100 p-2 md:p-8">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-center text-purple-700 drop-shadow-sm tracking-tight">
          📝 Kanban Board
        </h1>
        <div className="max-w-2xl mx-auto">
          <SearchBar />
        </div>
        <Board />
        <ArchivePanel />
        <TaskModal />
        <DeleteConfirmModal />
      </div>
    </TaskProvider>
  );
}

export default App;
