import React, { useCallback, useEffect, useState } from "react";

const AISummary: React.FC<{ videoUrl?: string }> = ({ videoUrl }) => {
    const [summary, setSummary] = useState<string>("");
    const [disable, setDisable] = useState<boolean>(false);

    const handleGenerateSummary = useCallback((_: React.MouseEvent) => {
        const fetchSummary = async () => {
            try {
                if (videoUrl === undefined) return;

                const response = await fetch("http://localhost:3005/api/summarization/summarizeVideo", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        videos: videoUrl,
                    })
                });
                const data = await response.json();
                console.log(data);
                setSummary(data.data);
                setDisable(true);
            } catch (error: any) {
                console.log(error);
            }
        };
        fetchSummary();
    }, [videoUrl]);

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button
                onClick={handleGenerateSummary}
                disabled={disable}
                style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: disable ? "#888" : "#fff",
                    backgroundColor: disable ? "#ddd" : "#007bff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: disable ? "not-allowed" : "pointer",
                    transition: "background-color 0.3s",
                }}
            >
                Generate Summary
            </button>
            <div style={{ marginTop: "20px", fontSize: "18px", color: "#333" }}>
                {summary}
            </div>
        </div>
    );
}

export default AISummary;
