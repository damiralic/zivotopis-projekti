using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Tree : MonoBehaviour
{
    public static Tree instance;
    public GameObject logPrefab;
    public GameObject logPrefab2;
    public int health;
    public Animator anim;

    void Awake()
    {
        if(instance != null && instance != this)
        {
            Destroy(this.gameObject);
            return;
        }

        instance = this;
        DontDestroyOnLoad(this.gameObject);
    }

    public void Shake()
    {
        anim.SetTrigger("Shake");
    }
    public void TakeDamage()
    {
        Shake();
        health--;
        if (health <= 0)
        {
            Instantiate(logPrefab, transform.position, transform.rotation);
            Instantiate(logPrefab2, transform.position, transform.rotation);
            Destroy(gameObject);
        }
    }
}
