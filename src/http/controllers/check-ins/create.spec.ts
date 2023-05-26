import { app } from "@/app"
import { prisma } from "@/libs/prisma"
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user"
import request from "supertest"

import { afterAll, beforeAll, describe, expect, it } from "vitest"

describe('Create Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()

  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to create a Gym', async () => {

    const { token } = await createAndAuthenticateUser(app)

    const gym = await prisma.gym.create({
      data: {
        title: 'Javascript Gym',
        latitude: -8.1575706,
        longitude: -34.9142071
      }
    })

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -8.1575706,
        longitude: -34.9142071
      })

    expect(response.statusCode).toEqual(201)

  })
})