import React, { useState, useEffect } from "react";
import { Card, Image, Header, Icon } from "semantic-ui-react";
import { extractHostname } from "../../app/common/util/Util";
import { getPopularBookmarks } from "../../services/PreviewBookmarkService";

const BookmarkRecommendationCard = props => {
  const [topBookmarks, settopBookmarks] = useState([]);
  useEffect(() => {
    getPopularBookmarks(props.userId).then(response => {
      if (response && response.bookmarks && response.bookmarks.length > 0)
        settopBookmarks(response.bookmarks);
    });
  }, []);

  return (
    <div className="recommendation-card-container">
      <Header as="h4" className="recommendation-card-header">
        <Icon name="bookmark" />
        Bookmarks Of the Day
      </Header>
      {/* {topBookmarks && topBookmarks.length === 0 && (
        <Dimmer active>
          <Loader content="Loading" />
        </Dimmer>
      )} */}
      {topBookmarks &&
        topBookmarks.length > 0 &&
        topBookmarks.map(bookmark => (
          <Card
            fluid
            className="recommendation-card"
            href={bookmark.url}
            key={bookmark.id}
          >
            <Card.Content>
              <div className="url-heading">
                <Image
                  className="padding-right-medium"
                  src={`chrome://favicon/${bookmark.url}`}
                />
                {extractHostname(bookmark.url)}
              </div>
              <Card.Meta>{bookmark.hitCount}</Card.Meta>
            </Card.Content>
          </Card>
        ))}

      {topBookmarks &&
        topBookmarks.length === 0 &&
        props.bookmarks &&
        props.bookmarks.length > 0 &&
        props.bookmarks.map(bookmark => (
          <Card
            fluid
            className="recommendation-card"
            href={bookmark.url}
            key={bookmark.id}
          >
            <Card.Content>
              <div className="url-heading">
                <Image
                  className="padding-right-medium"
                  src={`chrome://favicon/${bookmark.url}`}
                />
                {extractHostname(bookmark.url)}
              </div>
              <Card.Meta>{bookmark.title}</Card.Meta>
            </Card.Content>
          </Card>
        ))}
    </div>
  );
};

export default BookmarkRecommendationCard;
