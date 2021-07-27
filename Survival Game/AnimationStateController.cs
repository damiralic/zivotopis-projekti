using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AnimationStateController : MonoBehaviour
{

    Animator animator;
    // Start is called before the first frame update
    void Start()
    {
        animator = GetComponent<Animator>();
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKey("w"))
        {
            animator.SetBool("isWalking", true);
        }
        if (!Input.GetKey("w"))
        {
            animator.SetBool("isWalking", false);
        }
        if(Input.GetKey("w") && Input.GetKey(KeyCode.LeftShift))
        {
            animator.SetBool("isRunning", true);
        }
        if (!Input.GetKey(KeyCode.LeftShift))
        {
            animator.SetBool("isRunning", false);
        }
    }
}
