import QRCode from 'qrcode-svg';
export function generateSvg(content) {
    return new QRCode(btoa((content))).svg();
}