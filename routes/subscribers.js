const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')

// getting all
router.get('/', async (req, res) => {
  try{
    // fetch the actaul subscribers
    const subscribers = await Subscriber.find()
    res.json(subscribers)

  } catch{
    // there is a problem with the actual server itself
    res.status(500).json({message: err.message})
  }
})
// getting one
router.get('/:id', getSubscriber, (req, res) => {

  res.send(req.subscriber.name)
})



// creating one -> post
router.post('/', async (req, res) => {

  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel
  })

  try{
    const newSubscriber = await subscriber.save()
    // successfully created an object, always use 201
    res.status(201).json(newSubscriber)
  } catch(err){
    // 400 means there is something wrong with the user's input
    res.status(400).json({message: err.message})

  }


})

// updating one
router.patch('/:id', getSubscriber, async (req, res) => { // if the users only passes the name, we will update the name
  if(req.body.name != null){
    res.subscriber.name = req.body.name
  }
  if(req.body.subscribedToChannel != null){
    res.subscriber.subscribedToChannel = req.body.subscribedToChannel

  }

  try{
    const updatedSubscriber = await res.subscriber.save()
    res.json(updatedSubscriber)
  } catch(err){
    res.status(400).json({message: err.message})
  }

})

// deleting one
router.delete('/:id', getSubscriber, async (req, res) => {
  try{
    await res.subscriber.remove()
    res.json({message: 'Deleted Subscriber'})
  } catch(newSubscriber){
    res.status(500).son({message: err.message})
  }

})

async function getSubscriber(req, res, next){
  let subscriber
  try {
    subscriber = await Subscriber.findById(req.params.id)
    if(subscriber == null){
      return res.status(404).json({message: 'Cannot find subscriber' })
    }
  } catch(err){
    return res.status(500).json({message: err.message})
  }

  res.subscriber = subscriber
  next()
}


module.exports = router
