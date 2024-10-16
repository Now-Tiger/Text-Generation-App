import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

export default function PlayGround() {
  const [prompt, setPrompt] = useState(""); // For user input
  const [responseText, setResponseText] = useState<string | null>(null); // Allow both string and null
  const [loading, setLoading] = useState(false); // Loading state for submit

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8080/text-generation", {
        prompt, // Send the input text to the endpoint
      });

      setResponseText(response.data.generated_text); // Assuming response contains { generated_text: ... }
    } catch (error) {
      console.error("Error fetching generated text:", error);
      setResponseText("Failed to generate text. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <section className="bg-white dark:bg-gray-900">
      {/* Home button */}
      <div className="absolute top-4 right-4 px-4 py-2 mr-2 bg-blue-600 text-white rounded shadow-md hover:bg-gray-700">
        <a href="/" className="">Home</a>
      </div>

      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-blue-600 md:text-5xl lg:text-6xl dark:text-white">
          Playground 🎉
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          Give a short prompt & our text generation model will generate new text for you📍
        </p>

        {/* Form Section */}
        <div className="flex flex-col mb-5">
          <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto px-6">
            <textarea
              id="message"
              rows={5}
              className="block p-4 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Say something ..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)} // Capture user input
            ></textarea>
            <Button
              type="submit"
              className="mt-5 bg-blue-700"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate"}
            </Button>
          </form>

          {/* Response Card */}
          {responseText && (
            <div className="mt-6 mb-2 mx-auto px-10 bg-white shadow-lg rounded-lg p-6 border border-gray-200 dark:bg-gray-800 dark:border-gray-600">
              <h2 className="text-4xl font-extrabold tracking-tight leading-none text-gray-600 md:text-5xl lg:text-2xl dark:text-white mb-1">Generated Text</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 hover:text-slate-500">{responseText}</p>
            </div>
          )}
        </div>

        {/* Example Prompts Section */}
        <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
          <h3 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-700 md:text-3xl lg:text-4xl dark:text-white mt-1">
            Example prompts
          </h3>
          <p className="text-left leading-8 font-normal [&:not(:first-child)]:mt-1 dark:text-gray-400 text-gray-500">
            [~] The king, seeing how much happier his subjects were, realized the error of his ways and repealed,
          </p>
          <p className="text-left leading-8 font-normal [&:not(:first-child)]:mt-1 dark:text-gray-400 text-gray-500">
            [~] I love basketball. My favourite player is Michael Jordan.
          </p>
          <p className="text-left leading-8 font-normal [&:not(:first-child)]:mt-1 dark:text-gray-400 text-gray-500">
            [~] Sky is blue, water is colorless,
          </p>
        </div>
      </div>
    </section>
  );
}
