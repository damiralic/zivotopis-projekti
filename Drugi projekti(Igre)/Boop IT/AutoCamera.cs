using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class AutoCamera : MonoBehaviour
{
    public float speed;
    private float nextActionTime = 0.0f;
    public float period = 0.1f;
    void Update()
    {
        transform.Translate(Vector3.up * speed * Time.deltaTime);

            if (Time.time > nextActionTime)
            {
                nextActionTime += period;
            speed += 1;
            }
    }

}
