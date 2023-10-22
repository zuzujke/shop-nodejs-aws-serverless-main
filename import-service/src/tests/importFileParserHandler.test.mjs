import { importFileParserHandler } from '../importFileParser';
import { Readable } from 'stream';

describe('importFileParserHandler', () => {
    it('should process S3 records', async () => {
        const event = {
            Records: [
                {
                    s3: {
                        bucket: {
                            name: 'test-bucket',
                        },
                        object: {
                            key: 'uploaded/test.csv',
                        },
                    },
                },
            ],
        };

        const mockS3Client = {
            getObject: jest.fn().mockReturnValue({
                createReadStream: jest.fn(() => {
                    const mockStream = new Readable();
                    mockStream._read = () => {};
                    mockStream.push('Mocked response data');
                    mockStream.push(null);

                    return mockStream;
                }),
            }),
        };

        const mockLogger = {
            log: jest.fn(),
        };

        const logSpy = jest.spyOn(mockLogger, 'log');

        await importFileParserHandler({
            s3: mockS3Client,
            logger: mockLogger,
        })(event);

        await Promise.all([mockS3Client.getObject(), logSpy]);

        expect(mockS3Client.getObject).toHaveBeenCalledWith({
            Bucket: 'test-bucket',
            Key: 'uploaded/test.csv',
        });

        expect(logSpy).toHaveBeenCalledWith('Copy from test-bucket/uploaded/test.csv');
    });
});
