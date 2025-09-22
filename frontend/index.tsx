import {initializeBlock} from '@airtable/blocks/interface/ui';
import './style.css';

function HelloWorldTypescriptApp() {
    // YOUR CODE GOES HERE
    return (
        <div className="p-4 sm:p-8 min-h-screen relative bg-gray-gray50 dark:bg-gray-gray800">
            <div
                className="rounded-lg p-6 sm:p-12 max-w-lg mx-auto text-center mt-10 sm:mt-20
            bg-white shadow-xl
            dark:bg-gray-gray700 dark:shadow-none"
            >
                <h1
                    className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-display font-bold mb-2 leading-tight
                text-gray-gray700
                dark:text-gray-gray200"
                >
                    Hello world 🚀
                </h1>
                <div className="flex justify-center space-x-2 mt-6">
                    <div className="w-3 h-3 bg-red-red rounded-full animate-pulse" />
                    <div
                        className="w-3 h-3 bg-orange-orange rounded-full animate-pulse"
                        style={{animationDelay: '0.2s'}}
                    />
                    <div
                        className="w-3 h-3 bg-yellow-yellow rounded-full animate-pulse"
                        style={{animationDelay: '0.4s'}}
                    />
                    <div
                        className="w-3 h-3 bg-green-green rounded-full animate-pulse"
                        style={{animationDelay: '0.6s'}}
                    />
                    <div
                        className="w-3 h-3 bg-blue-blue rounded-full animate-pulse"
                        style={{animationDelay: '0.8s'}}
                    />
                    <div
                        className="w-3 h-3 bg-purple-purple rounded-full animate-pulse"
                        style={{animationDelay: '1s'}}
                    />
                </div>
            </div>
        </div>
    );
}

initializeBlock({interface: () => <HelloWorldTypescriptApp />});
