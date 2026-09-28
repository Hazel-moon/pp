// character-area 영역을 캡처하여 PNG 파일로 저장하는 기능

// 이미지 저장 함수
function saveAsImage() {
    // Shadow DOM 내부의 요소에 접근
    const shadowRoot = document.querySelector('your-component').shadowRoot;
    if (!shadowRoot) {
        console.error('Shadow DOM을 찾을 수 없습니다.');
        return;
    }

    const characterArea = shadowRoot.querySelector('.character-area');
    if (!characterArea) {
        console.error('캡처할 영역을 찾을 수 없습니다.');
        return;
    }

    // 임시 요소를 문서 본문에 생성 (Shadow DOM 외부)
    const tempDiv = document.createElement('div');
    tempDiv.id = 'temp-for-capture';
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px'; // 화면 밖으로 이동
    tempDiv.style.top = '0';
    document.body.appendChild(tempDiv);

    // character-area의 내용을 복제하여 임시 요소에 추가
    const clone = characterArea.cloneNode(true);
    tempDiv.appendChild(clone);

    // 스타일을 유지하기 위해 필요한 CSS 스타일을 임시로 추가
    const styles = Array.from(document.styleSheets)
        .filter(styleSheet => {
            try {
                return !styleSheet.href || styleSheet.href.startsWith(window.location.origin);
            } catch (e) {
                return false;
            }
        })
        .map(styleSheet => {
            try {
                return Array.from(styleSheet.cssRules)
                    .map(rule => rule.cssText)
                    .join('\n');
            } catch (e) {
                return '';
            }
        })
        .join('\n');

    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    tempDiv.appendChild(styleElement);

    // 임시 요소를 html2canvas로 캡처
    html2canvas(clone, {
        backgroundColor: null,
        scale: 2,
        allowTaint: true,
        useCORS: true
    }).then(canvas => {
        // 캔버스를 이미지로 변환
        const image = canvas.toDataURL('image/png');

        // 이미지 다운로드 링크 생성
        const link = document.createElement('a');
        link.href = image;
        link.download = '나의_옷차림.png';

        // 링크 클릭 이벤트 발생
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // 임시 요소 제거
        document.body.removeChild(tempDiv);
    }).catch(error => {
        console.error('이미지 캡처 오류:', error);

        // 실패 시 수동 캡처 방법 안내
        alert('이미지 저장에 실패했습니다. 화면 캡처 기능(스크린샷)을 사용해 주세요.');
        document.body.removeChild(tempDiv);
    });
}

// 대체 캡처 메서드 (html2canvas가 실패할 경우)
function captureUsingCanvas(element) {
    const rect = element.getBoundingClientRect();
    const canvas = document.createElement('canvas');
    canvas.width = rect.width;
    canvas.height = rect.height;
    const ctx = canvas.getContext('2d');

    // HTML 요소를 SVG로 변환
    const data = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${rect.width}" height="${rect.height}">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml">
            ${element.outerHTML}
          </div>
        </foreignObject>
      </svg>
    `;

    const img = new Image();
    img.onload = function () {
        ctx.drawImage(img, 0, 0);
        const pngUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = pngUrl;
        link.download = '나의_옷차림.png';
        link.click();
    };

    const svgBlob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    img.src = url;
}

// DOM이 완전히 로드된 후 이벤트 리스너 등록
document.addEventListener('DOMContentLoaded', function () {
    // Shadow DOM이 렌더링 될 시간을 주기 위해 약간의 지연 설정
    setTimeout(function () {
        const shadowRoot = document.querySelector('your-component').shadowRoot;
        if (shadowRoot) {
            const saveButton = shadowRoot.querySelector('.btn-save');
            if (saveButton) {
                saveButton.addEventListener('click', saveAsImage);
            } else {
                console.error('저장 버튼을 찾을 수 없습니다.');
            }
        } else {
            console.error('Shadow DOM을 찾을 수 없습니다.');
        }
    }, 1000); // 1초 지연
});

// 화면 캡처 및 PNG 저장 기능
(function () {
    // 파일명 생성 함수
    function generateFilename() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        return `capture_${year}${month}${day}_${hours}${minutes}${seconds}`;
    }

    // 캡처 기능
    function captureScreen() {
        // 대상 요소 찾기 - character-area가 실제 드레싱 게임 영역
        const $characterArea = qs('.character-area');

        if (!$characterArea.length || !$characterArea[0]) {
            console.error('캡처할 캐릭터 영역을 찾을 수 없습니다.');
            alert('캡처할 영역을 찾을 수 없습니다. 다시 시도해주세요.');
            return;
        }

        // 파일명 생성
        const fileName = generateFilename();

        // 임시 복제 영역 생성 (일반 DOM API 사용)
        const tempDiv = document.createElement('div');
        tempDiv.id = 'temp-capture-area';
        tempDiv.style.position = 'fixed';
        tempDiv.style.left = '-9999px';
        tempDiv.style.top = '0';
        tempDiv.style.width = $characterArea.width() + 'px';
        tempDiv.style.height = $characterArea.height() + 'px';
        tempDiv.style.overflow = 'hidden';
        tempDiv.style.zIndex = '-999';

        // 현재 상태 저장
        document.body.appendChild(tempDiv);
        const clone = $characterArea[0].cloneNode(true);
        tempDiv.appendChild(clone);

        // 스타일을 적절히 복제하기
        clone.style.position = 'static';
        clone.style.transform = 'none';
        clone.style.width = $characterArea.width() + 'px';
        clone.style.height = $characterArea.height() + 'px';

        console.log('캡처 준비 완료:', clone);

        // html2canvas로 캡처
        html2canvas(clone, {
            useCORS: true,
            allowTaint: true,
            backgroundColor: null,
            scale: 2,
            logging: true
        }).then(function (canvas) {
            // 다운로드 링크 생성
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = '나의_옷차림_' + fileName + '.png';
            link.click();

            // 임시 요소 정리
            document.body.removeChild(tempDiv);

            // 캡처 완료 알림
            console.log('캡처가 완료되었습니다.');
        }).catch(function (error) {
            console.error('캡처 중 오류 발생:', error);
            document.body.removeChild(tempDiv);

            // 대안으로 직접 캡처 시도
            captureDirectly();
        });
    }

    // 직접 캡처 시도 (대안)
    function captureDirectly() {
        try {
            const $characterArea = qs('.character-area');
            if (!$characterArea.length) {
                throw new Error('캐릭터 영역을 찾을 수 없습니다.');
            }

            html2canvas($characterArea[0], {
                useCORS: true,
                allowTaint: true,
                backgroundColor: null,
                scale: 2
            }).then(function (canvas) {
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/png');
                link.download = '나의_옷차림_' + generateFilename() + '.png';
                link.click();
                console.log('캡처가 완료되었습니다.');
            }).catch(function (err) {
                console.error('직접 캡처 오류:', err);
                alert('캡처를 완료할 수 없습니다. 브라우저의 스크린샷 기능을 사용해주세요.');
            });
        } catch (e) {
            console.error('직접 캡처 시도 중 오류:', e);
            alert('캡처를 완료할 수 없습니다. 브라우저의 스크린샷 기능을 사용해주세요.');
        }
    }

    // 버튼 클릭 이벤트 다시 등록
    $(document).ready(function () {
        // 기존 이벤트 제거 후 새로 등록
        qs('.btn-save').off('click').on('click', function () {
            if (typeof clickSound === 'function') {
                clickSound(); // 사운드 효과가 있다면 재생
            }
            captureScreen();
        });
    });
})(); 