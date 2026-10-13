# Gemini 한글 입력 후 엔터를 두 번 눌러야 전송될 때 해결법

영문 입력 시에는 Enter 한 번에 정상 동작하는 것을 확인하였고, 한글 입력기의 조합 이벤트 처리 관련 문제임을 알 수 있습니다
(Safari와 Chrome 모두 해결 가능합니다만, 이 글에서는 사파리를 기준으로 설명합니다)

한글은 자음과 모음이 합쳐져서 한 글자가 되기 때문에, 입력 중에는 글자가 확정되지 않은 조합 상태로 있습니다
이때 엔터를 누르면 브라우저가 조합을 끝내는 "compositionend" 이벤트를 먼저 보냅니다

![](https://blog.kakaocdn.net/dna/unTrh/dJMcacE6aTt/AAAAAAAAAAAAAAAAAAAAAKH6bFUrHmLvg2FsZFW4XhyfZWCSe12cWzxFfaiBmmk4/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1793458799&allow_ip=&allow_referer=&signature=VDpE%2BJwFuOxZe1HMTwo5MK8SgcY%3D)


해결 방법은 Userscripts라는 앱에 자바스크립트를 저장 후 실행되도록 하면 됩니다

우선 Mac App Store에서 무료 오픈소스 확장 프로그램인 Userscripts를 설치해주세요

[Userscripts App - App Store](https://apps.apple.com/kr/app/userscripts/id1463298887?l=en-GB)

그 후 Safari를 실행하고 메뉴바 좌측에 이런 아이콘을 클릭 후, "Open Extension Page"를 눌러서 소스코드 입력 창으로 넘어가주세요

![](https://blog.kakaocdn.net/dna/cHt5SP/dJMcadcD3OX/AAAAAAAAAAAAAAAAAAAAAISiB3eA62Hy8YFxynwFE2eO2Q5is3AMPgDnjcjF8tdh/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1793458799&allow_ip=&allow_referer=&signature=mzu42GRDxr%2Fo8vIN6QgPd20wuKI%3D)

"+" 버튼을 누르고, 자바스크립트를 선택해주세요

![](https://blog.kakaocdn.net/dna/bFrMr5/dJMb99VIlau/AAAAAAAAAAAAAAAAAAAAAD99DfL9VlMsHEpXJs34QTg3lG-XrvElXpxG556aOhU3/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1793458799&allow_ip=&allow_referer=&signature=87cO82HSdjDjqZWm9PRU0NnzQDA%3D)

기본 코드를 지우고 아래 코드를 붙여넣은 뒤 맥은 Cmd + S, 윈도우는 CTRL + S로 저장해주세요

[gemini-korean-enter-fix/gemini-korean-enter-fix.js at main · xdev-Deploy/gemini-korean-enter-fix](https://github.com/xdev-Deploy/gemini-korean-enter-fix/blob/main/gemini-korean-enter-fix.js)

Safari를 완전히 종료했다가 다시 열고, Gemini에서 한글 입력 후 엔터 한 번으로 전송되는지 확인합니다
