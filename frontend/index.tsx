import {initializeBlock} from '@airtable/blocks/interface/ui';
import './style.css';

function HelloWorldTypescriptApp() {
    // YOUR CODE GOES HERE
    return (
        <div className="p-4 sm:p-8 bg-gradient-to-br from-purple-purpleLight3 via-blue-blueLight3 to-teal-tealLight3 min-h-screen">
            <div className="max-w-lg mx-auto text-center pt-10 sm:pt-20">
                <div className="relative">
                    <div className="relative bg-white rounded-lg p-6 sm:p-12 shadow-xl">
                        <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-display font-bold text-gray-gray700 mb-2 leading-tight">
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
            </div>
        </div>
    );
}

initializeBlock({interface: () => <HelloWorldTypescriptApp />});
