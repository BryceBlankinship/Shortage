package controllers

import (
	"context"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"net/http"
	"shortage/configs"
	"shortage/models"
	"shortage/responses"
	"time"
)

var feedCollection *mongo.Collection = configs.GetCollection(configs.DB, "feedItems")

func CreateFeedItem(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var feedItem models.FeedItem
	defer cancel()

	if err := c.BodyParser(&feedItem); err != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.UserResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	if validationErr := validate.Struct(&feedItem); validationErr != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.UserResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": validationErr.Error()}})
	}

	filter := bson.D{{"userid", feedItem.UserId}}
	res, _ := feedCollection.Distinct(ctx, "title", filter)

	newFeedItem := models.FeedItem{
		UserId:   feedItem.UserId,
		Title:    feedItem.Title,
		Comments: feedItem.Comments,
		Desc:     feedItem.Desc,
		Price:    feedItem.Price,
		ImageUri: feedItem.ImageUri,
	}

	var finalResponse error

	if !contains(res, feedItem.Title) {
		result, err := feedCollection.InsertOne(ctx, newFeedItem)
		if err != nil {
			return c.Status(http.StatusInternalServerError).JSON(responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
		}
		finalResponse = c.Status(http.StatusCreated).JSON(responses.UserResponse{Status: http.StatusCreated, Message: "success", Data: &fiber.Map{"data": result}})
	} else {
		finalResponse = c.Status(http.StatusCreated).JSON(responses.UserResponse{
			Status:  http.StatusCreated,
			Message: "failed",
			Data:    &fiber.Map{"data": "Title '" + feedItem.Title + "' already exists."},
		})
	}
	return finalResponse
}

func GetFeedItem(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	userId := c.Params("userId")
	feedTitle := c.Params("title")
	var feedItem models.FeedItem
	defer cancel()

	err := feedCollection.FindOne(ctx, bson.M{"title": feedTitle, "userid": userId}).Decode(&feedItem)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	return c.Status(http.StatusOK).JSON(responses.UserResponse{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": feedItem}})

}

func AddComment(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	userId := c.Params("userId")
	title := c.Params("title")
	var comment models.Comment
	defer cancel()

	//validate the request body
	if err := c.BodyParser(&comment); err != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.UserResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	//use the validator library to validate required fields
	if validationErr := validate.Struct(&comment); validationErr != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.UserResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": validationErr.Error()}})
	}

	newComment := models.Comment{
		UserId:      comment.UserId,
		DisplayName: comment.DisplayName,
		ProfileURI:  comment.ProfileURI,
		Comment:     comment.Comment,
	}

	filter := bson.M{"title": title, "userid": userId}
	update := bson.M{"comments": newComment}
	res, err := feedCollection.UpdateOne(ctx, filter, bson.M{"$push": update})
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err}})
	}

	return c.Status(http.StatusOK).JSON(responses.UserResponse{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": res}})

}

func DeleteFeedItem(c *fiber.Ctx) error {
	return nil
}
