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
        return `나의_옷차림_${year}${month}${day}_${hours}${minutes}${seconds}.png`;
    }

    function captureScreen() {
        console.log('캡처 시작 (전체 화면 캡처 후 마스킹 방식)...');

        const $slidePrev = qs('.slide-prev');
        $slidePrev.hide();

        const $cropGuideElement = qs('.temp-capture-area');

        if (!$cropGuideElement.length || !$cropGuideElement[0]) {
            console.error('잘라낼 영역 기준 요소(.temp-capture-area)를 찾을 수 없습니다.');
            alert('잘라낼 영역 기준 요소(.temp-capture-area)를 찾을 수 없습니다. HTML 및 CSS를 확인해주세요.');
            $slidePrev.show();
            return;
        }

        const fileName = generateFilename();
        const guideElement = $cropGuideElement[0];

        console.log('html2canvas 실행 준비 (document.body 대상)...');

        html2canvas(document.body, {
            useCORS: true,
            allowTaint: true,
            backgroundColor: null,
            scale: 2,
            logging: false,
            x: window.scrollX,
            y: window.scrollY,
            width: window.innerWidth,
            height: window.innerHeight
        }).then(function(canvas) {
            console.log('화면 뷰포트 캡처 완료. 캔버스 크기:', canvas.width, 'x', canvas.height);

            try {
                const ctx = canvas.getContext('2d');
                const guideRect = guideElement.getBoundingClientRect();
                const scale = 2;

                let cropX = guideRect.left * scale;
                let cropY = guideRect.top * scale;
                let cropWidth = guideRect.width * scale;
                let cropHeight = guideRect.height * scale;

                const safeCropX = Math.max(0, cropX);
                const safeCropY = Math.max(0, cropY);
                const safeCropWidth = Math.max(0, Math.min(cropWidth, canvas.width - safeCropX));
                const safeCropHeight = Math.max(0, Math.min(cropHeight, canvas.height - safeCropY));

                if (safeCropWidth <= 0 || safeCropHeight <= 0) {
                    throw new Error(`크롭 영역 계산 오류: 유효한 크롭 영역이 없습니다 (W: ${safeCropWidth}, H: ${safeCropHeight}). .temp-capture-area가 화면 밖에 있거나 CSS 크기가 0일 수 있습니다.`);
                }

                console.log(`조정된 크롭 영역: x=${safeCropX}, y=${safeCropY}, width=${safeCropWidth}, height=${safeCropHeight}`);

                const croppedCanvas = document.createElement('canvas');
                croppedCanvas.width = safeCropWidth;
                croppedCanvas.height = safeCropHeight;
                const croppedCtx = croppedCanvas.getContext('2d');

                croppedCtx.drawImage(
                    canvas,
                    safeCropX,
                    safeCropY,
                    safeCropWidth,
                    safeCropHeight,
                    0,
                    0,
                    safeCropWidth,
                    safeCropHeight
                );

                console.log('캔버스 크롭 완료.');

                // ✅ Blob 방식으로 다운로드 (콘솔 경고 제거용)
                croppedCanvas.toBlob(function(blob) {
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = fileName;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url); // 메모리 정리
                    console.log('Blob 방식 다운로드 완료.');
                }, 'image/png');

            } catch (e) {
                console.error('캔버스 크롭 또는 저장 중 오류 발생:', e.message, e.stack || '');
                alert('이미지 저장 중 오류가 발생했습니다: ' + e.message);
            } finally {
                $slidePrev.show();
            }

        }).catch(function(error) {
            console.error('html2canvas 캡처 중 오류 발생:', error.message, error.stack || '');
            alert('이미지 캡처 중 오류가 발생했습니다. 콘솔을 확인해주세요.');
            $slidePrev.show();
        });
    }

    $(document).ready(function () {
        console.log('문서 로드 완료. 캡처 이벤트 리스너 등록 시도...');
        const $saveButton = qs('.btn-save');
        if ($saveButton.length) {
            $saveButton.off('click').on('click', captureScreen);
            console.log('.btn-save 버튼에 캡처 이벤트 리스너 등록 완료.');
        } else {
            console.error('.btn-save 버튼을 찾을 수 없습니다.');
        }
    });
})();
