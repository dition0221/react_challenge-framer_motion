# React - Netflix (Challenge)

### Vite + React + TypeScript로 Netflix 클론 웹 사이트를 만듭니다. [Challenge] Netflix clone website. Using React+Vite+TS.

<img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white"/> <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white"/> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white"/> <img src="https://img.shields.io/badge/Styled&dash;Components-DB7093?style=flat-square&logo=styledcomponents&logoColor=white"/>  
<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white"/> <img src="https://img.shields.io/badge/Framer Motion-0055FF?style=flat-square&logo=framer&logoColor=white"/> <img src="https://img.shields.io/badge/React Hook Form-EC5990?style=flat-square&logo=reacthookform&logoColor=white"/> <img src="https://img.shields.io/badge/Recoil-3578E5?style=flat-square&logo=recoil&logoColor=white"/> <img src="https://img.shields.io/badge/Recoil Persist-3578E5?style=flat-square&logoColor=white"/>

---

- **23-11-30 : #8.0 ~ #8.10 / Framer-Motion(1) (+ Code Challenge(2 days)[1st day])**
  - <a href="https://www.framer.com/motion/" target="_blank">Framer-Motion 패키지</a>
    - React용 모션 애니메이션 라이브러리
    - 설치법 : `npm i framer-motion`
    - 선언법 : `<motion.HTML태그명>`
      - styled-components와 같이 쓰려면, `styled(motion.HTML태그명)`
  - animation 사용법
    - 모션 컴포넌트에 프로퍼티들을 사용해 스타일링
      - 프로퍼티들은 'style'프로퍼티 방식으로 사용함 ({{ ... }})
    - 'animate' 프로퍼티
      - 애니메이션을 정의
      - 색상 스타일링으로 '문자열'을 사용 시 애니메이션 없이 즉각적으로 변함
        - '숫자'값을 사용 시 애니메이션으로 색상이 변함
    - <a href="https://www.framer.com/motion/transition/" target="_blank">'transition' 프로퍼티</a>
      - 애니메이션 방식을 정의
        - delay : 원하는 시간 후에 애니메이션 발생
        - duration : 원하는 시간동안 애니메이션 발생
        - type : 애니메이션의 타입 (기본값 : spring)
          - tween : 선형(linear)
        - stiffness : 뻣뻣한 정도
        - damping : 튀어오르는 정도 (반동력)
    - 'initial' 프로퍼티
      - 해당 요소의 초기 스타일을 정의
    - ex.
      ```
      <Box
        animate={{ borderRadius: "50%" }}
        transition={{ delay: 1, duration: 2 }}
      />
      ```
  - Variants
    - 애니메이션의 다양한 상태 및 속성을 정의하는 객체
      - 애니메이션 설정을 분리된 객체로 옮김
        - 코드를 깔끔하게 함
        - 많은 애니메이션들을 하나로 연결시켜줌
    - 선언법
      ```
      const 변수명: Variants = {
        키명: { 스타일링 },
        ......
      };
      ```
      - 키명은 원하는 이름으로 사용 가능
      - 'transition'은 마지막 stage의 값 내부에서 사용
      - 'Variants' 타입을 사용하면, 스타일링 시 TS의 도움을 받을 수 있음
      - ex.
        ```
        const myVariants: Variants = {
          start: { scale: 0 },
          end: {
            scale: 1,
            rotateZ: 360,
            transition: { type: "tween", delay: 1 }
          },
        };
        ```
    - 사용법 : `<motion.컴포넌트 variants={variants변수명} 프로퍼티="키명" />`
      - 프로퍼티값으로 키명을 똑같이 사용해야 함에 주의
      - ex. `<Box variants={myVariants} initial="start" animate="end" />`
  - 자식 요소를 위한 스타일링
    - 부모 요소에서 variants와 애니메이션 프로퍼티 사용 시 자동으로 자식 요소에게도 똑같이 적용됨
      - 자식 요소의 프로퍼티들이 부모 요소와 같은 값을 가지게 됨
    - 여러 개의 자식 요소를 각각의 delay값을 가지도록 하는 방법
      1. 부모 요소에서 'transition.delayChildren'값을 사용해, 자식 요소의 delay값을 설정
      2. 부모 요소에서 'transition.staggerChildren'값을 사용해, 각각의 자식 요소의 delay값을 설정
         - 각각의 자식 요소들의 애니메이션 사이의 delay값
      - ex.
        ```
        const boxVariants: Variants = {
          animate: {
            transition: {
              delayChildren: 0.5,
              staggerChildren: 0.5,
            },
          },
        };
        ```
  - 제스쳐에 따른 애니메이션
    - 'while제스쳐' 프로퍼티를 사용해 제스쳐에 따른 애니메이션을 생성 가능
      - { whileDrag, whileFocus, whileHover, whileInView, whileTap(클릭) }
  - 드래그
    - 사용법: 모션 컴포넌트에 'drag' 프로퍼티를 추가
      - 'whileDrag' 프로퍼티를 사용해, 드래그 중의 스타일을 정의 가능
    - 수직/수평 제약 : drag="x" / drag="y"
    - 드래그 범위 제약
      - 기본형 : `dragConstraints={{}}` 프로퍼티를 추가
        - 드래깅이 허용될 수 있는 제한 영역을 생성
        - 옵션으로 { top, bottom, left, right }를 사용
        - ex. `<Box drag dragConstraints={{ top: -50, bottom: 50, left: -50, right: 50 }} />`
      - 제약 영역을 넘어서면, 제약 영역 내로 돌아감
      - 제약 영역으로 다른 컴포넌트를 사용할 수 있음
        - 'ref' 프로퍼티를 사용 (useRef())
          - 특정 element를 잡을 수 있는 방법
          - 선언 기본형 : `const 변수명 = useRef<HTML요소제네릭>(null);`
          - 사용 기본형 : `<컴포넌트 ref={Ref변수명} />`
        - 기본형 : `dragConstraints={Ref변수명}`
      - 드래그 후 원래 자리로 되돌아가는 법
        - 기본형 : 'dragSnapToOrigin' 프로퍼티를 추가
      - 드래그 탄성
        - 드래그 시 element가 커서를 따르는 정도 (당기는 힘)
        - 기본형 : `dragElastic={값}` 프로퍼티를 추가
          - 값 : 0 ~ 1 사이의 값
            - 1 : element가 커서를 정확히 따름
            - 0 : element가 제약 영역 내에서만 머무름
            - 0.5 : 기본값
  - MotionValue
    - 애니메이션 내의 수치를 트래킹한 값
      - 위치에 따라 스타일링은 다르게 하기위함 등에 사용
    - useMotionValue()
      - MotionValue값을 생성하는 메서드
      - 기본형
        ```
        const 변수명 = useMotionValue(초기값);
        <컴포넌트 style={{ MotionValue변수 }} />
        ```
      - ex.
        ```
        const x = useMotionValue(0);
        <Box style={{ x }} drag="x" />
        ```
      - MotionValue는 '.get()', '.set()' 등의 메서드 사용 가능
      - MotionValue가 업데이트되어도 React 컴포넌트를 re-render 하지 않음
        - state값이 아님
    - useMotionValueEvent()
      - MotionValue값을 추적하기 위해 사용하는 메서드
      - 기본형 : `useMotionValueEvent(MotionValue변수, 이벤트명, 콜백함수);`
        - 'useEffect(() => { MotionValue변수명.on(이벤트명, 콜백함수) }, []);'를 사용하는 방법도 여전히 가능하지만, 반환하는 구독취소 함수값을 useEffect의 return문에서 사용해 구독취소를 해주어야 함
        - 이벤트명 중 "change"는 콜백함수의 인자로 'latest'값(= .get()) 제공
      - ex. `useMotionValueEvent(x, "change", (latest) => console.log(latest));`
  - useTransform()
    - 애니메이션의 입력 범위를 다른 값의 범위로 변환(매핑)할 때 사용하는 hook
      - 이를 통해 점진적으로 변하는 애니메이션을 생성할 수 있음
    - 기본형 : `const 변수명 = useTransform(MotionValue변수, [입력값들], [출력값들]);`
      - 입력값과 출력값의 갯수는 원하는대로 할 수 있으나, 서로 갯수가 같아야 함
    - ex.
      ```
      const x = useMotionValue(0);
      const potato = useTransform(x, [-500, 0, 500], [2, 1, 0.1]);
      <Box style={{ x, scale: potato }} drag="x" dragSnapToOrigin />
      ```
  - useScroll()
    - scroll 애니메이션에 대한 수치(MotionValue)를 넘겨주는 hook
    - 기본형 : `const { scrollX, scrollY, scrollXProgress, scrollYProgress } = useScroll();`
      - scrollX / scrollY : 절대 스크롤 위치 (px단위)
      - scrollXProgress / scrollYProgress : 상대 스크롤 위치 (0~1 값)
    - ex.
      ```
      const { scrollYProgress } = useScroll();
      const scale = useTransform(scrollYProgress, [0, 1], [1, 5]);
      <Box style={{ scale }} />
      ```
  - svg 애니메이션
    - &lt;svg&gt;(또는 &lt;path&gt;)의 스타일링 프로퍼티 (기존 CSS)
      - fill : 색상
      - stroke : 테두리 선
      - stroke-width : 테두리 선의 굵기
    - &lt;motion.path&gt;의 스타일링 프로퍼티 (&lt;motion.svg&gt; 내부에서 사용해야 함)
      - pathLength : 현재 위치까지의 path의 길이 (0~1 값)
      - pathSpacing : 요소가 따라가는 경로의 간격
        - 사용 시 요소가 따라가는 경로의 일부분을 건너뛸 수 있음 (기본값 0)
      - pathOffset : 요소가 따라가는 경로의 시작위치를 조절하는 데 사용 (기본값 0)
    - ex.
      ````
      const Svg = styled(motion.svg)`
        width: 300px;
        height: 300px;
        stroke: white;
        stroke-width: 2;
      `;
      const svgVariants: Variants = {
        start: { pathLength: 0, fill: "rgba(255,255,255,0)" },
        end: {
          pathLength: 1,
          fill: "rgba(255,255,255,1)",
          transition: { duration: 5 },
        },
      };
      <Svg>
        <motion.path
          variants={svgVariants}
          initial="start"
          animate="end"
          d="......"
        />
      </Svg>
      ```'
      ````
  - 특정 프로퍼티의 애니메이션 transition을 단독으로 변경하는 방법
    - 기본적으로 transition은 모든 애니메이션에 동시 적용됨
    - 기본형 : `transition: { default: 전제적용값, CSS속성: 개별적용값 }`
    - ex.
      ```
      const svgVariants: Variants = {
        start: { pathLength: 0, fill: "rgba(255,255,255,0)" },
        end: {
          pathLength: 1,
          fill: "rgba(255,255,255,1)",
          transition: {
            default: { duration: 5 },
            fill: { duration: 2, delay: 5 },
          },
        },
      };
      ```
- **23-12-01 : #8.11 ~ #8.16 / Framer-Motion(2) (+ Code Challenge(2 days)[2nd day])**
  - https://codesandbox.io/p/devbox/framer-motion-23-12-01-krslcw
  - https://krslcw-5173.csb.app/

---

노마드 코더 정책 상 강의요약은 괜찮으나, 코드와 필기는 공개적인 곳에 올리면 안 됨.
필기 요약지는 암호화된 .zip 파일로 저장함.
