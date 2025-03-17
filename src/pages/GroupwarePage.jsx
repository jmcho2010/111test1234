// src/pages/GroupwarePage.jsx
import { useAuth } from "../contexts/AuthContext";

export default function GroupwarePage() {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("로그아웃 오류:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            그룹웨어 대시보드
          </h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-700">
              <span className="font-medium">
                {currentUser.displayName || currentUser.email}
              </span>{" "}
              님 환영합니다
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* 그룹웨어 콘텐츠 */}
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-4">
              <h2 className="text-xl font-semibold mb-4">그룹웨어 기능</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded shadow">
                  <h3 className="font-medium">공지사항</h3>
                  <p className="text-sm text-gray-500">
                    최신 공지를 확인하세요.
                  </p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                  <h3 className="font-medium">일정관리</h3>
                  <p className="text-sm text-gray-500">팀 일정을 관리하세요.</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                  <h3 className="font-medium">전자결재</h3>
                  <p className="text-sm text-gray-500">
                    결재 문서를 처리하세요.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
