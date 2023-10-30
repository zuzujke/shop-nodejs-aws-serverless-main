import { importProductsFileHandler } from '../index';

const mockS3 = {
    getSignedUrlPromise: jest.fn(() => Promise.resolve('mockedUrl')),
};

const mockEvent = {
    queryStringParameters: {
        name: 'sample.csv',
    },
};

describe('importProductsFileHandler', () => {
    it('should return a signed URL on success', async () => {
        const result = await importProductsFileHandler({ s3: mockS3 })(mockEvent);

        expect(result.statusCode).toBe(200);

        expect(result).toEqual({
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify('mockedUrl'),
        });
    });

    it('should handle errors gracefully', async () => {
        mockS3.getSignedUrlPromise.mockRejectedValue(new Error('S3 error'));

        const result = await importProductsFileHandler({ s3: mockS3 })(mockEvent);

        expect(result.statusCode).toBe(500);

        expect(result).toEqual({
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({ message: 'S3 error' }),
        });
    });
});
