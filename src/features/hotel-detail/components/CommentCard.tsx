import {FC} from 'react';
import {IComment} from "~/services/api/types.ts";

interface CommentCardProps {
  comment: IComment
}

const CommentCard: FC<CommentCardProps> = ({comment}) => {
  return (
    <div className={'w-full h-30 flex flex-col justify-between bg-white rounded border p-4'}>
      <div className={'flex justify-between'}>
        <p>{comment.user}</p>

        <p>امتیاز: {comment.rating}</p>
      </div>

      <p className={'text-sm text-gray-700'}>
        {comment.text}
      </p>
    </div>
  );
};

export default CommentCard;