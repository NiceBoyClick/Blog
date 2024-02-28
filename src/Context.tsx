import React, {createContext, useContext, useState, ReactNode, useMemo} from 'react';

interface ReactionContextType {
    likeCount: Record<number, number>;
    dislikeCount: Record<number, number>;
    reactionStatus: Record<number, "like" | "dislike" | null>;
    handleLike: (postId: number) => void;
    handleDislike: (postId: number) => void;
    setLikeCount: React.Dispatch<React.SetStateAction<Record<number, number>>>;
    setDislikeCount: React.Dispatch<React.SetStateAction<Record<number, number>>>;
}

export const PostContext = createContext<ReactionContextType | undefined>(undefined);

export const useReactions = () => {
    const context = useContext(PostContext);
    if (context === undefined) {
        throw new Error('useReactions must be used within a ReactionProvider');
    }
    return context;
}

export const ReactionProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [likeCount, setLikeCount] = useState<Record<number, number>>({});
    const [dislikeCount, setDislikeCount] = useState<Record<number, number>>({});
    const [reactionStatus, setReactionStatus] = useState<Record<number, "like" | "dislike" | null>>({});

    const handleLike = (postId: number) => {
        setReactionStatus(prev => {
            const currentReaction = prev[postId];
            if (currentReaction === "like") {
                // Отменяем лайк
                setLikeCount(prevCount => ({...prevCount, [postId]: prevCount[postId] - 1}));
                return {...prev, [postId]: null};
            } else {
                // Добавляем или переключаем на лайк
                const adjustment = currentReaction === "dislike" ? -1 : 0;
                setLikeCount(prevCount => ({...prevCount, [postId]: (prevCount[postId] || 0) + 1}));
                setDislikeCount(prevCount => ({
                    ...prevCount,
                    [postId]: Math.max((prevCount[postId] || 0) + adjustment, 0)
                }));
                return {...prev, [postId]: "like"};
            }
        });
    };

    const handleDislike = (postId: number) => {
        setReactionStatus(prev => {
            const currentReaction = prev[postId];
            if (currentReaction === "dislike") {
                // Отменяем дизлайк
                setDislikeCount(prevCount => ({...prevCount, [postId]: prevCount[postId] - 1}));
                return {...prev, [postId]: null};
            } else {
                // Добавляем или переключаем на дизлайк
                const adjustment = currentReaction === "like" ? -1 : 0;
                setDislikeCount(prevCount => ({...prevCount, [postId]: (prevCount[postId] || 0) + 1}));
                setLikeCount(prevCount => ({
                    ...prevCount,
                    [postId]: Math.max((prevCount[postId] || 0) + adjustment, 0)
                }));
                return {...prev, [postId]: "dislike"};
            }
        });
    };

    const value = useMemo(() => ({
        likeCount,
        dislikeCount,
        reactionStatus,
        handleLike,
        handleDislike,
        setLikeCount,
        setDislikeCount
    }), [likeCount, dislikeCount, reactionStatus]);

    return (
        <PostContext.Provider value={value}>
            {children}
        </PostContext.Provider>
    );
};