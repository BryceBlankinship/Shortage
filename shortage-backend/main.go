package main

import (
	"shortage/configs"
	"shortage/routes"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()

	configs.ConnectDB()

	routes.UserRoute(app)
	routes.ListRoute(app)
	routes.FeedRoute(app)

	app.Listen(":8080")
}
