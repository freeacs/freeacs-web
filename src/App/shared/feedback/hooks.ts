import { useEffect, useState } from 'react';

export const useFeedback = () => {
  const [feedback, setFeedback] = useState<string>();

  useEffect(() => {
    if (!feedback) {
      return;
    }
    const timer = setTimeout(() => setFeedback(undefined), 5000);
    return () => clearTimeout(timer);
  }, [feedback]);

  return { feedback, setFeedback };
};
