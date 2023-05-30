import { app } from "@/app"
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
    const { token } = await createAndAuthenticateUser(app, true)

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Javascript Gym',
        description: 'Test Gym Description',
        phone: '119999999',
        latitude: -8.1575706,
        longitude: -34.9142071
      })

    expect(response.statusCode).toEqual(201)

  })
})