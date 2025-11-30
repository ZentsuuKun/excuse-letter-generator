import React, { useState } from 'react';

const ExcuseGenerator = () => {
    const [formData, setFormData] = useState({
        reason: '',
        recipient: '',
        tone: 'Professional',
        userName: '',
    });
    const [generatedExcuse, setGeneratedExcuse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const templates = {
        Professional: [
            "Dear {recipient},\n\nPlease accept this letter as formal notification that I am unable to attend work today due to {reason}. I apologize for any inconvenience this may cause and will ensure that my responsibilities are covered.\n\nSincerely,\n{userName}",
            "To {recipient},\n\nI am writing to inform you that I will not be able to make it in today because {reason}. I appreciate your understanding in this matter.\n\nBest regards,\n{userName}",
            "Dear {recipient},\n\nDue to {reason}, I regret to inform you that I cannot attend our scheduled meeting today. I will follow up as soon as possible to reschedule.\n\nRegards,\n{userName}"
        ],
        Casual: [
            "Hey {recipient},\n\nSo sorry, but I can't make it today. {reason}. I'll make it up to you later!\n\nCheers,\n{userName}",
            "Hi {recipient},\n\nJust wanted to let you know I'm out for the day. {reason}. Talk soon!\n\n- {userName}",
            "{recipient},\n\nNot gonna lie, I can't come in. {reason}. Hope you understand!\n\nBest,\n{userName}"
        ],
        Funny: [
            "Dearest {recipient},\n\nThe universe has conspired against me. Specifically, {reason}. I know, it sounds fake, but here we are. Pray for me.\n\nYours in chaos,\n{userName}",
            "Yo {recipient},\n\nI wish I was making this up, but {reason}. If I don't survive, tell my cat I love her.\n\nPeace out,\n{userName}",
            "Greetings {recipient},\n\nI am currently indisposed due to a severe case of {reason}. It's tragic, really. I'll be back once the drama subsides.\n\nOver and out,\n{userName}"
        ],
        Dramatic: [
            "My Dearest {recipient},\n\nIt is with a heavy heart that I must bear the news of my absence. Fate has dealt a cruel hand: {reason}. I shall endeavor to return once the storm has passed.\n\nEternally yours,\n{userName}",
            "Oh {recipient},\n\nThe world is a dark place today. {reason}. I am utterly defeated. Please carry on without me, for I am but a shadow today.\n\nWith sorrow,\n{userName}",
            "{recipient},\n\nWhy must life be this way? {reason}. I am weeping internally. I cannot face the world right now.\n\nFarewell for now,\n{userName}"
        ],
        Sincere: [
            "Dear {recipient},\n\nI am so incredibly sorry, but I won't be able to make it. {reason}. I feel terrible about letting you down and hope you can forgive me.\n\nWarmly,\n{userName}",
            "Hi {recipient},\n\nPlease forgive me, but I have to cancel. {reason}. It means a lot to me that you understand.\n\nSincerely,\n{userName}",
            "To {recipient},\n\nI'm writing this with sincere apologies. {reason}. I hope this doesn't cause too much trouble.\n\nBest,\n{userName}"
        ]
    };

    const generateExcuse = async () => {
        setLoading(true);
        setError('');
        setGeneratedExcuse('');

        // Simulate a short delay for "thinking" effect
        await new Promise(resolve => setTimeout(resolve, 800));

        if (!formData.userName) {
            setError('Please enter your Name.');
            setLoading(false);
            return;
        }
        if (!formData.recipient) {
            setError('Please enter a Recipient.');
            setLoading(false);
            return;
        }
        if (!formData.reason) {
            setError('Please enter a Reason.');
            setLoading(false);
            return;
        }

        try {
            const toneTemplates = templates[formData.tone] || templates['Professional'];
            const randomTemplate = toneTemplates[Math.floor(Math.random() * toneTemplates.length)];

            const excuse = randomTemplate
                .replace(/{recipient}/g, formData.recipient)
                .replace(/{reason}/g, formData.reason)
                .replace(/{userName}/g, formData.userName);

            setGeneratedExcuse(excuse);
        } catch (err) {
            setError('Failed to generate excuse. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedExcuse);
        alert('Copied to clipboard!');
    };

    // Theme Classes
    const containerClass = isDarkMode
        ? "min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4 font-sans text-white transition-colors duration-500"
        : "min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans text-gray-900 transition-colors duration-500";

    const cardClass = isDarkMode
        ? "max-w-4xl w-full bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20 flex flex-col md:flex-row transition-all duration-500"
        : "max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200 flex flex-col md:flex-row transition-all duration-500";

    const inputClass = isDarkMode
        ? "w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
        : "w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all";

    const labelClass = isDarkMode
        ? "block text-sm font-medium text-gray-300 mb-1"
        : "block text-sm font-medium text-gray-700 mb-1";

    const titleGradient = isDarkMode
        ? "text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-2"
        : "text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2";

    const subtitleClass = isDarkMode
        ? "text-gray-300 text-sm"
        : "text-gray-500 text-sm";

    const resultSectionClass = isDarkMode
        ? "md:w-1/2 bg-black/20 p-8 flex flex-col justify-center relative transition-colors duration-500"
        : "md:w-1/2 bg-gray-50 p-8 flex flex-col justify-center relative transition-colors duration-500";

    const resultBoxClass = isDarkMode
        ? "flex-grow bg-white/5 border border-white/10 rounded-2xl p-6 text-gray-200 leading-relaxed overflow-y-auto min-h-[300px] shadow-inner transition-colors duration-500"
        : "flex-grow bg-white border border-gray-200 rounded-2xl p-6 text-gray-800 leading-relaxed overflow-y-auto min-h-[300px] shadow-inner transition-colors duration-500";

    const copyButtonClass = isDarkMode
        ? "mt-4 w-full bg-white/10 hover:bg-white/20 text-white font-medium py-2 rounded-xl transition-all flex items-center justify-center gap-2"
        : "mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 rounded-xl transition-all flex items-center justify-center gap-2";

    return (
        <div className={containerClass}>
            <div className={cardClass}>

                {/* Input Section */}
                <div className="p-8 md:w-1/2 space-y-6 relative">
                    {/* Theme Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        className="absolute top-8 right-8 p-2 rounded-full hover:bg-gray-200/20 transition-colors"
                        title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    >
                        {isDarkMode ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        )}
                    </button>

                    <h1 className={titleGradient}>
                        Excuse Generator
                    </h1>
                    <p className={subtitleClass}>
                        Generate the perfect excuse in seconds. No AI key required.
                    </p>

                    <div className="space-y-4">
                        <div>
                            <label className={labelClass}>Your Name</label>
                            <input
                                type="text"
                                name="userName"
                                value={formData.userName}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>Reason</label>
                            <textarea
                                name="reason"
                                value={formData.reason}
                                onChange={handleChange}
                                placeholder="I overslept because my cat turned off my alarm..."
                                rows="3"
                                className={`${inputClass} resize-none`}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className={labelClass}>Recipient</label>
                                <input
                                    type="text"
                                    name="recipient"
                                    value={formData.recipient}
                                    onChange={handleChange}
                                    placeholder="My Boss"
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Tone</label>
                                <select
                                    name="tone"
                                    value={formData.tone}
                                    onChange={handleChange}
                                    className={`${inputClass} appearance-none`}
                                >
                                    <option className={isDarkMode ? "bg-gray-900" : "bg-white"}>Professional</option>
                                    <option className={isDarkMode ? "bg-gray-900" : "bg-white"}>Casual</option>
                                    <option className={isDarkMode ? "bg-gray-900" : "bg-white"}>Funny</option>
                                    <option className={isDarkMode ? "bg-gray-900" : "bg-white"}>Dramatic</option>
                                    <option className={isDarkMode ? "bg-gray-900" : "bg-white"}>Sincere</option>
                                </select>
                            </div>
                        </div>

                        <button
                            onClick={generateExcuse}
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 rounded-xl shadow-lg transform transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Generating...
                                </span>
                            ) : (
                                'Generate Excuse'
                            )}
                        </button>

                        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                    </div>
                </div>

                {/* Result Section */}
                <div className={resultSectionClass}>
                    <div className="absolute top-0 right-0 p-4">
                        <div className="w-20 h-20 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
                    </div>

                    <h2 className={`text-2xl font-bold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        <span className="text-purple-400">✨</span> Your Excuse
                    </h2>

                    <div className={resultBoxClass}>
                        {generatedExcuse ? (
                            <p className="whitespace-pre-wrap">{generatedExcuse}</p>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-gray-500 opacity-50">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                <p>Your generated excuse will appear here...</p>
                            </div>
                        )}
                    </div>

                    {generatedExcuse && (
                        <button
                            onClick={copyToClipboard}
                            className={copyButtonClass}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Copy to Clipboard
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExcuseGenerator;
