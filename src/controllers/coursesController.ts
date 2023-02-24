import { Request, Response } from "express";
import { courseService } from "../services/courseService";

export const coursesController = {
    featured: async (req: Request, res: Response) => {

        try {
            const featuresCourses = await courseService.getRandomFeaturedCourses()
            return res.json(featuresCourses)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    },

    show: async (req: Request, res: Response) => {
        const { id } = req.params

        try {
            const course = await courseService.findByIdWithEpisodes(id)
            return res.json(course)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    }
}