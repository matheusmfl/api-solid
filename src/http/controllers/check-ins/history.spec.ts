import { app } from "@/app"
import { prisma } from "@/libs/prisma"
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user"
import request from "supertest"

import { afterAll, beforeAll, describe, expect, it } from "vitest"

describe('Check-in History (e2e)', () => {
  beforeAll(async () => {
    await app.ready()

  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to list the history of check-ins', async () => {

    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        title: 'Javascript Gym',
        latitude: -8.1575706,
        longitude: -34.9142071
      }
    })

    await prisma.checkIn.createMany({
      data: [{
        gym_id: gym.id,
        user_id: user.id
      },
      {
        gym_id: gym.id,
        user_id: user.id
      }]
    })

    const response = await request(app.server)
      .get(`/check-ins/history`)
      .set('Authorization', `Bearer ${token}`)
      .send()
    console.log(response)

    expect(response.statusCode).toEqual(200)
    expect(response.body.checkIns).toEqual([
      expect.objectContaining({
        gym_id: gym.id,
        user_id: user.id
      }),
      expect.objectContaining({
        gym_id: gym.id,
        user_id: user.id
      })
    ])

  })
})