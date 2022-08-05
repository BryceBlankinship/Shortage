package controllers

import (
	"context"
	"net/http"
	"shortage/configs"
	"shortage/models"
	"shortage/responses"
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var listCollection *mongo.Collection = configs.GetCollection(configs.DB, "lists")

func contains(list []interface{}, target string) bool {
	for _, i := range list {
		if target == i {
			return true
		}
	}
	return false
}

func CreateList(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var list models.List
	defer cancel()

	//validate the request body
	if err := c.BodyParser(&list); err != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.UserResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	//use the validator library to validate required fields
	if validationErr := validate.Struct(&list); validationErr != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.UserResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": validationErr.Error()}})
	}

	filter := bson.D{{"userid", list.UserId}}
	res, _ := listCollection.Distinct(ctx, "title", filter)

	newList := models.List{
		UserId:   list.UserId,
		Title:    list.Title,
		Desc:     list.Desc,
		Contents: list.Contents,
	}

	var finalResponse error

	if !contains(res, list.Title) {
		result, err := listCollection.InsertOne(ctx, newList)
		if err != nil {
			return c.Status(http.StatusInternalServerError).JSON(responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
		}
		finalResponse = c.Status(http.StatusCreated).JSON(responses.UserResponse{Status: http.StatusCreated, Message: "success", Data: &fiber.Map{"data": result}})
	} else {
		finalResponse = c.Status(http.StatusCreated).JSON(responses.UserResponse{
			Status:  http.StatusCreated,
			Message: "failed",
			Data:    &fiber.Map{"data": "Title '" + list.Title + "' already exists."},
		})
	}
	return finalResponse
}

func GetListTitles(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	userId := c.Params("userId")
	defer cancel()

	filter := bson.D{{"userid", userId}}
	results, err := listCollection.Distinct(ctx, "title", filter)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	return c.Status(http.StatusOK).JSON(responses.UserResponse{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": results}})
}

func GetList(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	userId := c.Params("userId")
	listTitle := c.Params("listTitle")
	var list models.List
	defer cancel()

	err := listCollection.FindOne(ctx, bson.M{"title": listTitle, "userid": userId}).Decode(&list)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	return c.Status(http.StatusOK).JSON(responses.UserResponse{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": list}})

}

func UpdateList(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	userId := c.Params("userId")
	var list models.List
	defer cancel()

	err := listCollection.FindOne(ctx, bson.M{"title": list.Title, "userid": userId}).Decode(&list)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	return c.Status(http.StatusOK).JSON(responses.UserResponse{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": &list}})

}

func DeleteList(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	userId := c.Params("userId")
	var user models.User
	defer cancel()

	objId, _ := primitive.ObjectIDFromHex(userId)

	err := listCollection.FindOne(ctx, bson.M{"id": objId}).Decode(&user)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	return c.Status(http.StatusOK).JSON(responses.UserResponse{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": user}})

}
