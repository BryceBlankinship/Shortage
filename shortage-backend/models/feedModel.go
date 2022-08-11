package models

type FeedItem struct {
	UserId   string    `json:"userId,omitempty" validate:"required"`
	Title    string    `json:"title,omitempty" validate:"required"`
	Comments []Comment `json:"comments,omitempty" validate:"required"`
	Desc     string    `json:"desc,omitempty" validate:"required"`
	Price    string    `json:"price,omitempty" validate:"required"`
	ImageUri string    `json:"imageUri,omitempty" validate:"required"`
}

type Comment struct {
	UserId      string `json:"userId,omitempty" validate:"required"`
	DisplayName string `json:"displayName,omitempty" validate:"required"`
	ProfileURI  string `json:"profileUri,omitempty" validate:"required"`
	Comment     string `json:"comment,omitempty" validate:"required"`
}
