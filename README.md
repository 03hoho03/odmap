# ODmap: 의료 시설 검색 및 리뷰 웹 서비스

## 1. 프로젝트 소개

**ODmap**은 사용자가 지도상에서 원하는 조건의 병원, 약국 등 의료 시설을 쉽게 찾고, 다른 사용자들이 남긴 리뷰를 통해 경험을 공유할 수 있도록 돕는 풀스택 웹 애플리케이션입니다.

- **Frontend**: `React`, `Redux`를 사용하여 역동적이고 반응성 높은 사용자 인터페이스를 구축했습니다.
- **Backend**: `Node.js`, `Express` 기반의 REST API 서버를 구축하고 `MongoDB`를 데이터베이스로 사용합니다.

## 2. 주요 기능

- **🗺️ 지도 기반 검색**: 카카오맵 API를 연동하여 의료 시설 위치를 직관적으로 제공하며, 필터링 기능을 지원합니다.
- **🔐 사용자 인증**: JWT(JSON Web Token)를 이용한 안전한 회원가입 및 로그인 기능을 제공합니다.
- **✍️ 리뷰 관리**: 사용자는 방문한 시설에 대한 리뷰를 작성, 조회, 수정, 삭제할 수 있습니다.
- **✨ 상태 관리**: Redux(Redux-Toolkit)를 사용하여 사용자 정보, 검색 데이터 등 전역 상태를 효율적으로 관리합니다.

## 3. 적용 기술

### Frontend
- React
- Redux (Redux-Toolkit)
- React Router
- Axios
- Tailwind CSS
- React Kakao Maps SDK

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Token (JWT)
- bcryptjs

## 4. 프로젝트 실행 방법

### 사전 요구사항
- Node.js (v16 이상 권장)
- npm
- MongoDB URI

---

### **1. Backend 서버 실행**

```bash
# 1. backend 디렉터리로 이동
cd backend

# 2. 의존성 패키지 설치
npm install

# 3. .env 파일 생성 및 환경 변수 설정
# backend 디렉터리 최상단에 .env 파일을 생성하고 아래 내용을 추가하세요.
# MONGO_URI: 발급받은 MongoDB URI
# JWT_SECRET: JWT 암호화에 사용할 시크릿 키 (임의의 문자열)

MONGO_URI="Your_MongoDB_URI"
JWT_SECRET="Your_JWT_Secret"

# 4. 백엔드 개발 서버 실행 (nodemon)
npm run dev

# 서버가 http://localhost:5000 에서 실행됩니다. (포트는 다를 수 있음)
```

---

### **2. Frontend 서버 실행**

```bash
# 1. frontend 디렉터리로 이동
cd frontend

# 2. 의존성 패키지 설치
npm install

# 3. .env 파일 생성 및 환경 변수 설정
# frontend 디렉터리 최상단에 .env 파일을 생성하고 아래 내용을 추가하세요.
# REACT_APP_API_URL: 실행된 백엔드 서버 주소

REACT_APP_API_URL="http://localhost:5000"

# 4. 프론트엔드 개발 서버 실행
npm start

# http://localhost:3000 주소로 애플리케이션이 열립니다.
```
