import crypto from 'crypto';
import axios from 'axios';
import momoConfig from '../config/momoConfig.js';

const createPaymentUrl = async (bookingId, amount, orderInfo) => {
    const requestId = bookingId + '_' + new Date().getTime();
    const orderId = bookingId + '_' + new Date().getTime();
    const requestType = momoConfig.requestType;
    const redirectUrl = momoConfig.redirectUrl;
    const ipnUrl = momoConfig.ipnUrl;
    const extraData = ''; // Pass empty value if your merchant does not have stores

    // const rawSignature = `accessKey=${momoConfig.accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${momoConfig.partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
    // const signature = crypto.createHmac('sha256', momoConfig.secretKey).update(rawSignature).digest('hex');

    const rawSignature = "accessKey=" + momoConfig.accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + momoConfig.partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType;

    var signature = crypto.createHmac('sha256', momoConfig.secretKey)
        .update(rawSignature)
        .digest('hex');

    const requestBody = {

        partnerCode: momoConfig.partnerCode,
        partnerName: "Test",
        storeId: "MomoTestStore",
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        lang: 'vi',
        requestType: requestType,
        autoCapture: true,
        extraData: extraData,
        orderGroupId: '',
        signature: signature
    };

    try {
        const response = await axios.post(momoConfig.endpoint, requestBody, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data.payUrl;
    } catch (error) {
        console.error('Error creating payment URL:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export default {
    createPaymentUrl
};