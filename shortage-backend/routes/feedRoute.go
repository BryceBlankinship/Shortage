package routes

import (
	"github.com/gofiber/fiber/v2"
	"shortage/controllers"
)

func FeedRoute(app *fiber.App) {
	app.Post("/feedItem", controllers.CreateFeedItem)
	app.Get("/feedItem/:userId/:title", controllers.GetFeedItem)
	app.Patch("/feedItem/:userId/:title", controllers.AddComment)
	app.Delete("/feedItem/:itemId", controllers.DeleteFeedItem)
}
