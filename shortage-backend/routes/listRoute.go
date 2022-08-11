package routes

import (
	"shortage/controllers"

	"github.com/gofiber/fiber/v2"
)

func ListRoute(app *fiber.App) {
	app.Post("/lists", controllers.CreateList)
	app.Get("/lists/:userId", controllers.GetListTitles)
	app.Get("/lists/:userId/:listTitle", controllers.GetList)
	app.Patch("/lists/:userId/:listTitle", controllers.AddItem)
	app.Delete("/lists/:userId/", controllers.DeleteList)
}
