import { Avatar, Box, Rating, styled } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DislikeIcon, LikeIcon } from '../../../assets/icons';
import { likeAndDislike } from '../../../redux/slices/homeDetail.slice';

import DotsMenu from './DotsMenu';

function Feedback({
   createdFeedback,
   text,
   like,
   liked,
   dislike,
   disliked,
   rating,
   image,
   owner,
   id,
   signIn,
}) {
   const [showMore, setShowMore] = useState(true);
   const paramid = useParams();
   const dispatch = useDispatch();
   const { isAuthorized } = useSelector((state) => state.auth);

   const toggleHandler = () => {
      setShowMore(!showMore);
   };

   const likeHandler = (id) => {
      dispatch(
         likeAndDislike({
            id,
            like: !liked,
            dislike: disliked,
            getId: paramid.id,
         })
      );
   };

   const dislikeHandler = () => {
      dispatch(
         likeAndDislike({
            id,
            dislike: !disliked,
            like: liked,
            getId: paramid.id,
         })
      );
   };

   const estimation = rating === undefined ? '' : `(${rating})`;
   return (
      <BoxWrapper>
         <AvatarContainer>
            <BoxStyled>
               <Avatar sx={{ bgcolor: 'grey' }}>{owner?.name[0]}</Avatar>{' '}
               <span>{owner?.name}</span>
               <RatingContainer>
                  <Rating name="read-only" value={rating} readOnly />
                  <div>{`${estimation}`}</div>
               </RatingContainer>
            </BoxStyled>
            <DotsMenu />
         </AvatarContainer>
         <Box>
            <DataBox>{createdFeedback}</DataBox>
         </Box>
         <CommentContainer>
            <StyledComment>
               {showMore ? text?.slice(0, 200) : text}
               {text?.length >= 200 ? (
                  <StyledSeeButton onClick={toggleHandler}>
                     {!showMore ? 'Show less' : 'Show more'}
                  </StyledSeeButton>
               ) : null}
            </StyledComment>
         </CommentContainer>

         <ImgHomeWrapper>
            {image?.length === 0 ? null : (
               <ImageHome src={image} alt="apartment" />
            )}
         </ImgHomeWrapper>

         <LikeAndDislike>
            {isAuthorized ? (
               <>
                  <StyledDiv>
                     <StyledIcon
                        liked={liked}
                        onClick={() => likeHandler(id)}
                     />{' '}
                     <span>{like}</span>
                  </StyledDiv>

                  <StyledDiv>
                     <StyledDislike
                        disliked={disliked}
                        onClick={() => dislikeHandler()}
                     />{' '}
                     <span>{dislike}</span>
                  </StyledDiv>
               </>
            ) : (
               <>
                  <StyledDiv>
                     <StyledIcon onClick={signIn} /> <span>{like}</span>
                  </StyledDiv>

                  <StyledDiv>
                     <StyledDislike onClick={signIn} /> <span>{dislike}</span>
                  </StyledDiv>
               </>
            )}
         </LikeAndDislike>
      </BoxWrapper>
   );
}

export default Feedback;

const StyledIcon = styled(LikeIcon)((props) => ({
   cursor: 'pointer',
   '& path': {
      fill: props.liked ? '#faaf00' : null,
   },
}));
const StyledDislike = styled(DislikeIcon)((props) => ({
   cursor: 'pointer',
   '& path': {
      fill: props.disliked ? '#faaf00' : null,
   },
}));
const BoxStyled = styled('div')(() => ({
   fontWeight: '500',
   fontSize: '18px',
   lineHeight: '22px',
   color: '#000000',
   display: 'flex',
   gap: '10px',
   alignItems: 'center',
   rowGap: '27px',
}));
const StyledSeeButton = styled('button')(() => ({
   color: '#266BD3',
   border: 'none',
   background: 'white',
   cursor: 'pointer',
   marginLeft: '10px',
}));
const BoxWrapper = styled(Box)(() => ({
   width: '630px',
   gap: '10px',
}));
const CommentContainer = styled(Box)(() => ({
   fontSize: '16px',
   lineHeight: '130%',
   color: '#646464',
   marginTop: '30px',
}));
const StyledComment = styled('p')(() => ({
   wordWrap: 'break-word',
}));
const AvatarContainer = styled(Box)(() => ({
   fontWeight: '500',
   fontSize: '18px',
   lineHeight: '22px',
   color: '#000000',
   display: 'flex',
   gap: '10px',
   alignItems: 'center',
   rowGap: '27px',
   justifyContent: 'space-between',
}));
const RatingContainer = styled(Box)(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   width: '140px',
}));
const LikeAndDislike = styled(Box)(() => ({
   width: '100px',
   height: '50px',
   display: 'flex',
   alignItems: 'center',
   paddingTop: '16px',
   justifyContent: 'space-around',
}));
const DataBox = styled(Box)(() => ({
   marginLeft: '50px',
}));

const StyledDiv = styled('div')(() => ({
   display: 'flex',
   gap: '10px',
   alignItems: 'center',
}));

const ImageHome = styled('img')(() => ({
   width: '100px',
   height: '100px',
   marginTop: '26px',
}));

const ImgHomeWrapper = styled('div')(() => ({
   display: 'flex',
   gap: '3px',
   flexWrap: 'wrap',
}));
