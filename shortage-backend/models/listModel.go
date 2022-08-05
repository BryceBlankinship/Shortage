package models

type List struct {
	UserId   string   `json:"userId,omitempty" validate:"required"`
	Title    string   `json:"title,omitempty" validate:"required"`
	Desc     string   `json:"desc,omitempty" validate:"required"`
	Contents []string `json:"contents,omitempty" validate:"required"`
}
