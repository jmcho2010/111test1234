import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function NoticeListPage() {
  // 공지사항 목록 상태
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  // 중요 공지사항과 일반 공지사항 분리
  const [importantNotices, setImportantNotices] = useState([]);
  const [regularNotices, setRegularNotices] = useState([]);

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5; // 페이지당 5개 항목

  // 정렬 및 필터 상태
  const [sortBy, setSortBy] = useState("latest");
  const [searchTerm, setSearchTerm] = useState("");

  // 임시 데이터 로드 (나중에 Firebase로 대체)
  useEffect(() => {
    // 데이터 로딩 시뮬레이션
    setLoading(true);
    setTimeout(() => {
      const dummyData = [
        {
          id: "1",
          title: "2023년 4분기 회사 목표 안내",
          content: "4분기 회사 목표에 대한 안내입니다...",
          author: "김경영",
          department: "경영지원팀",
          createdAt: "2023-10-15",
          isImportant: true,
          viewCount: 128,
        },
        {
          id: "2",
          title: "신규 프로젝트 킥오프 미팅 일정 공지",
          content: "신규 프로젝트 킥오프 미팅을 다음과 같이 진행합니다...",
          author: "박개발",
          department: "개발팀",
          createdAt: "2023-10-12",
          isImportant: false,
          viewCount: 95,
        },
        {
          id: "3",
          title: "사내 네트워크 점검 안내 (10/20)",
          content:
            "원활한 업무 환경 제공을 위한 네트워크 점검이 있을 예정입니다...",
          author: "이인프라",
          department: "IT인프라팀",
          createdAt: "2023-10-10",
          isImportant: true,
          viewCount: 112,
        },
        {
          id: "4",
          title: "연말 휴가 신청 안내",
          content: "연말 휴가 신청에 대한 안내입니다...",
          author: "최인사",
          department: "인사팀",
          createdAt: "2023-10-08",
          isImportant: false,
          viewCount: 87,
        },
        {
          id: "5",
          title: "10월 보안 교육 일정 안내",
          content: "전 직원 대상 보안 교육을 실시합니다...",
          author: "정보안",
          department: "보안팀",
          createdAt: "2023-10-05",
          isImportant: false,
          viewCount: 76,
        },
        {
          id: "6",
          title: "매우 중요함",
          content: "책임을 물을것이야!",
          author: "누렁",
          department: "누렁팀",
          createdAt: "2023-10-06",
          isImportant: true,
          viewCount: 9724,
        },
        {
          id: "7",
          title: "택배왔어요",
          content: "누구의 것인가",
          author: "누렁",
          department: "누렁팀",
          createdAt: "2023-10-06",
          isImportant: true,
          viewCount: 9724,
        },
        {
          id: "8",
          title: "누렁이 왔어요",
          content: "누구의 것인가",
          author: "누렁",
          department: "누렁팀",
          createdAt: "2023-10-06",
          isImportant: false,
          viewCount: 9724,
        },
        {
          id: "9",
          title: "누렁이 또 왔어요",
          content: "누구의 것인가",
          author: "누렁",
          department: "누렁팀",
          createdAt: "2023-10-06",
          isImportant: false,
          viewCount: 9724,
        },
        {
          id: "10",
          title: "누렁이 또또 왔어요",
          content: "누구의 것인가",
          author: "누렁",
          department: "누렁팀",
          createdAt: "2023-10-06",
          isImportant: false,
          viewCount: 9724,
        },
        {
          id: "11",
          title: "누렁이 또또또또 왔어요",
          content: "오늘도 왔어요",
          author: "누렁",
          department: "누렁팀",
          createdAt: "2023-10-06",
          isImportant: true,
          viewCount: 9724,
        },
      ];

      // 중요 공지사항과 일반 공지사항 분리
      const important = dummyData.filter((notice) => notice.isImportant);
      const regular = dummyData.filter((notice) => !notice.isImportant);

      // 정렬 적용
      const sortedRegular = sortNotices(regular, sortBy);
      const sortedImportant = sortNotices(important, sortBy);

      // 검색어 필터링 적용
      const filteredRegular = filterNotices(sortedRegular, searchTerm);
      const filteredImportant = filterNotices(sortedImportant, searchTerm);

      setImportantNotices(filteredImportant);
      setRegularNotices(filteredRegular);
      setNotices(dummyData);

      // 일반 공지사항만 페이지네이션 계산에 사용
      setTotalPages(Math.ceil(filteredRegular.length / itemsPerPage));
      setLoading(false);
    }, 800);
  }, [sortBy, searchTerm]);

  // 정렬 함수
  const sortNotices = (noticeList, sortType) => {
    const sorted = [...noticeList];

    switch (sortType) {
      case "latest":
        return sorted.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case "oldest":
        return sorted.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      case "views":
        return sorted.sort((a, b) => b.viewCount - a.viewCount);
      default:
        return sorted;
    }
  };

  // 검색 필터링 함수
  const filterNotices = (noticeList, term) => {
    if (!term) return noticeList;

    return noticeList.filter(
      (notice) =>
        notice.title.toLowerCase().includes(term.toLowerCase()) ||
        notice.content.toLowerCase().includes(term.toLowerCase())
    );
  };

  // 현재 페이지에 표시할 일반 공지사항만 필터링
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentRegularNotices = regularNotices.slice(
    indexOfFirstPost,
    indexOfFirstPost + itemsPerPage
  );

  // 검색 핸들러
  const handleSearch = (e) => {
    e.preventDefault();
    // 검색 로직 구현 (현재는 상태만 업데이트)
    setCurrentPage(1); // 검색 시 첫 페이지로 리셋
  };

  // 정렬 변경 핸들러
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1); // 정렬 변경 시 첫 페이지로 리셋
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">공지사항</h1>
        <Link
          to="/notice/new"
          className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors focus:ring-4 focus:ring-indigo-100"
        >
          공지사항 작성
        </Link>
      </div>

      {/* 검색 및 필터 */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="제목 또는 내용으로 검색"
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600"
            >
              🔍
            </button>
          </div>
        </form>

        <div className="w-full sm:w-48">
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300"
          >
            <option value="latest">최신순</option>
            <option value="oldest">오래된순</option>
            <option value="views">조회수순</option>
          </select>
        </div>
      </div>

      {/* 공지사항 목록 */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        {/* 중요 공지사항 */}
        {importantNotices.length > 0 && (
          <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
            <h2 className="text-lg font-semibold text-indigo-800">중요 공지</h2>
          </div>
        )}

        <div className="divide-y divide-gray-100">
          {loading ? (
            // 로딩 상태
            Array(3)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="px-6 py-4">
                  <div className="animate-pulse">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              ))
          ) : importantNotices.length === 0 && regularNotices.length === 0 ? (
            // 결과 없음
            <div className="px-6 py-12 text-center">
              <p className="text-gray-500">공지사항이 없습니다.</p>
            </div>
          ) : (
            // 공지사항 목록
            <>
              {/* 중요 공지사항 먼저 표시 - 항상 모든 페이지에서 최상단에 표시 */}
              {importantNotices.map((notice) => (
                <Link
                  key={notice.id}
                  to={`/notice/${notice.id}`}
                  className="block hover:bg-gray-50 transition-colors"
                >
                  <div className="px-6 py-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                        중요
                      </span>
                      <h3 className="font-medium text-gray-900">
                        {notice.title}
                      </h3>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <span>{notice.department}</span>
                      <span className="mx-1">•</span>
                      <span>{notice.author}</span>
                      <span className="mx-1">•</span>
                      <span>{notice.createdAt}</span>
                      <span className="mx-1">•</span>
                      <span>조회 {notice.viewCount}</span>
                    </div>
                  </div>
                </Link>
              ))}

              {/* 일반 공지사항 - 페이지네이션 적용 */}
              {currentRegularNotices.map((notice) => (
                <Link
                  key={notice.id}
                  to={`/notice/${notice.id}`}
                  className="block hover:bg-gray-50 transition-colors"
                >
                  <div className="px-6 py-4">
                    <h3 className="font-medium text-gray-900 mb-1">
                      {notice.title}
                    </h3>
                    <div className="flex items-center text-xs text-gray-500">
                      <span>{notice.department}</span>
                      <span className="mx-1">•</span>
                      <span>{notice.author}</span>
                      <span className="mx-1">•</span>
                      <span>{notice.createdAt}</span>
                      <span className="mx-1">•</span>
                      <span>조회 {notice.viewCount}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </>
          )}
        </div>

        {/* 페이지네이션 - 일반 공지사항만 페이지네이션 적용 */}
        {!loading && regularNotices.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-100 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                이전
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === page
                        ? "bg-indigo-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md ${
                  currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                다음
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}
